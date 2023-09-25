export enum Status {
    OPEN = "open",
    CLOSED = "closed",
    CLOSED_TEMPORARILY = "closed temporarily",
    CLOSED_FOR_REFURBISHMENT = "closed for refurbishment",
}

export enum Type {
    RIDE = "ride",
    SHOW = "show",
    ATTRACTION = "attraction",
}

export enum Park {
    DISNEYLAND = "disneyland",
    CALIFORNIA_ADVENTURE = "california adventure",
}

export enum Age {
    PRESCHOOLERS = "preschoolers",
    KIDS = "kids",
    TWEENS = "tweens",
    TEENS = "teens",
    ADULTS = "adults",
}

export interface Attraction {
    name: string;
    actualName: string;
    type: Type;
    park: Park;
    area: String;
    heightRequirement: number;
    ages: Age[];
    tags: String[];
    seasonal?: boolean;
    variant?: boolean;
    todaysHours: [number, number] | [];
    todaysTimes: number[];
    waitTime: number;
    status: Status;
    waitTimeLastUpdated: Date;
}

