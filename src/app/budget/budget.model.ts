export class Budget{ 
    id: string;
    allocatedAmount: number;
    spentAmount: number;
    categoryAllocations: Map<string, number>;

    constructor(
        id: string | null,
        allocatedAmount: number,
        spentAmount: number = 0,
        categoryAllocations: Map<string, number> = new Map()
    ) {
        this.id = id || crypto.randomUUID();
        this.allocatedAmount = allocatedAmount;
        this.spentAmount = spentAmount;
        this.categoryAllocations = categoryAllocations;
    } 

    
}