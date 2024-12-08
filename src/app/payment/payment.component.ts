import { Component, OnInit } from '@angular/core';
import { Vendor } from '../vendor/vendor.model';
import { VendorService } from '../vendor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Payment } from './payment.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  vendorId: string | null = null;
  vendor: Vendor | null = null;
  payments: Payment[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  showAddForm = false;
  totalAmount: number = 0;
  paidAmount: number = 0;
  pendingAmount: number = 0;

  constructor(
    private route: ActivatedRoute,
    private vendorService: VendorService, 
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.vendorId = params['vendorId'];
      if (this.vendorId) {
        this.loadVendorDetails();
        this.loadPayments();
      }
    });
  }

  loadVendorDetails() {
    if (!this.vendorId) return;

    this.isLoading = true;
    this.vendorService.getVendorById(this.vendorId).subscribe({
      next: (vendor) => {
        this.vendor = vendor;
        this.totalAmount = vendor.totalAmount;
        this.calculateAmounts();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading vendor details:', error);
        this.error = 'Failed to load vendor details';
        this.isLoading = false;
      }
    });
  }

  loadPayments() {
    if (!this.vendorId) return;
    
    this.isLoading = true;
    this.vendorService.getPaymentsByVendorId(this.vendorId).subscribe({
      next: (response) => {
        this.payments = response.map(payment => ({
          id: payment.id || '',
          vendorId: payment.vendorId || '',
          amount: payment.amount || 0,
          paymentDate: payment.paymentDate || '',
          paymentStatus: payment.paymentStatus || 'PENDING',
          paymentType: payment.paymentType || '',
          referenceNumber: payment.referenceNumber || '',
        }));
        this.calculateAmounts();
        this.isLoading = false;
        console.log(this.payments)
      },
      error: (error) => {
        console.error('Error loading payments:', error);
        this.error = 'Failed to load payments';
        this.isLoading = false;
      }
    });
  }

  calculateAmounts() {
    this.paidAmount = this.payments.reduce((sum, payment) => sum + payment.amount, 0);
    this.pendingAmount = this.totalAmount - this.paidAmount;
  }

  editPayment(payment: Payment) {
    if (!this.vendorId) return;
    
    this.isLoading = true;
    this.vendorService.updatePayment(payment.id, payment, this.vendorId).subscribe({
      next: () => {
        this.loadVendorDetails();
        this.loadPayments();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error updating payment:', error);
        this.error = 'Failed to update payment';
        this.isLoading = false;
      }
    });
  } 

  goBack() {
    this.router.navigate(['/content/vendor']);
  }

  deletePayment(paymentId: string | null) {
    if (paymentId) {
      this.isLoading = true;
      this.vendorService.deletePayment(paymentId, this.vendorId).subscribe({
        next: () => {
          this.loadPayments();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error deleting payment:', error);
          this.error = 'Failed to delete payment';
          this.isLoading = false;
        }
      });
    }
  }

  openAddForm() {
    this.showAddForm = true;
  }

  closeAddForm() {
    this.showAddForm = false;
  }


  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getPaymentMethodLabel(method: string): string {
    const methods: { [key: string]: string } = {
      'CASH': 'Cash',
      'UPI': 'UPI',
      'BANK_TRANSFER': 'Bank Transfer',
      'CHEQUE': 'Cheque'
    };
    return methods[method] || method;
  }

  
}