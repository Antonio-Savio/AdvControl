export interface DemandProps{
    id: string;
    name: string;
    description: string;
    type: string;
    status: string;
    deadline: Date | null;
    created_at: Date | null;
    updated_at: Date | null;
    customerId: string | null;
    UserId: string | null;
}