import { Book } from "@prisma/client";


export type IPaginationOptions = {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
};

export type IBookFilterRequest = Book & { searchTerm: string }


