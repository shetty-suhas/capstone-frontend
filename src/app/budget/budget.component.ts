import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Event as CustomEvent } from '../add-event-form/Event';
import { EventService } from '../event.service';
import { VendorService } from '../vendor.service';
import { Vendor } from '../vendor/vendor.model';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {
  events: CustomEvent[] = [];
  selectedEventId: string | null = null;
  vendors: Vendor[] = []; 
  dropdownOpen = false;
  
  totalBudget: number = 0;
  totalSpent: number = 0;
  totalDue: number = 0;
  categoryExpenses: Map<string, number> = new Map();
  
  doughnutChart: Chart | undefined;
  barChart: Chart | undefined;
  isLoading: boolean = false;

  constructor(
    private vendorService: VendorService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.isLoading = true;
    this.eventService.getAllEvents().subscribe({
      next: (events) => {
        this.events = events;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading events:', error);
        this.isLoading = false;
      }
    });
  } 

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
}

selectOption(event: any): void {
    this.selectedEventId = event.id;
    this.dropdownOpen = false;
    this.loadVendors();
}

@HostListener('document:click')
closeDropdown(): void {
    this.dropdownOpen = false;
}

  onEventSelect(eventId: string): void {
    this.selectedEventId = eventId;
    this.loadVendors();
  }

  loadVendors(): void {
    if (!this.selectedEventId) return;

    this.isLoading = true;
    this.vendorService.getVendorsByEventId(this.selectedEventId).subscribe({
      next: (vendors) => {
        this.vendors = vendors;
        this.calculateTotals();
        this.calculateCategoryExpenses();
        setTimeout(() => {
          this.createCharts();
        }, 0);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading vendors:', error);
        this.isLoading = false;
      }
    });
  }

  private calculateTotals(): void {
    this.totalBudget = this.vendors.reduce((sum, vendor) => 
      sum + vendor.totalAmount, 0);
      this.totalSpent = this.vendors.reduce((sum, vendor) => 
      sum + (vendor.totalAmount - (vendor.pendingAmount || 0)), 0);
      this.totalDue = this.vendors.reduce((sum, vendor) => 
      sum + (vendor.pendingAmount || 0), 0);
  }

  private calculateCategoryExpenses(): void {
    this.categoryExpenses.clear();
    this.vendors.forEach(vendor => {
      const currentAmount = this.categoryExpenses.get(vendor.type) || 0;
      this.categoryExpenses.set(vendor.type, currentAmount + vendor.totalAmount);
    });
  }

  private createCharts(): void {
    this.createDoughnutChart();
    this.createBarChart();
  }

  private createDoughnutChart(): void {
    const canvas = document.getElementById('doughnutChart') as HTMLCanvasElement;
    if (!canvas) {
      console.error('Cannot find doughnut chart canvas');
      return;
    }

    if (this.doughnutChart) {
      this.doughnutChart.destroy();
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Cannot get 2d context for doughnut chart');
      return;
    }

    try {
      this.doughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: Array.from(this.categoryExpenses.keys()),
          datasets: [{
            data: Array.from(this.categoryExpenses.values()),
            backgroundColor: [
              '#3b82f6',
              '#ef4444',
              '#10b981',
              '#f59e0b',
              '#6366f1'
            ]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right'
            }
          }
        }
      });
    } catch (error) {
      console.error('Error creating doughnut chart:', error);
    }
  }

  private createBarChart(): void {
    const canvas = document.getElementById('barChart') as HTMLCanvasElement;
    if (!canvas) {
      console.error('Cannot find bar chart canvas');
      return;
    }

    if (this.barChart) {
      this.barChart.destroy();
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Cannot get 2d context for bar chart');
      return;
    }

    try {
      this.barChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.vendors.map(vendor => vendor.name),
          datasets: [
            {
              label: 'Amount Paid',
              data: this.vendors.map(vendor => 
                (vendor.totalAmount - (vendor.pendingAmount || 0)) || 0), 
                backgroundColor: '#3b82f6'
              
            }, 
            {
              label: 'Amount Due',
              data: this.vendors.map(vendor => vendor.pendingAmount || 0),
              backgroundColor: '#ef4444'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              stacked: true
            },
            y: {
              stacked: true,
              beginAtZero: true
            }
          }
        }
      });
    } catch (error) {
      console.error('Error creating bar chart:', error);
    }
  }
}