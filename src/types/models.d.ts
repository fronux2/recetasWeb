export interface User {
    id?: string;
    name: string;
    email: string;
    createdAt: Date;
  }
  
export interface Recipe {
id?: string;
userId: number;
description: string;
ingredients: string;
instructions: string;
category: string;
imageUrl: string;
createdAt?: Date;
}
  