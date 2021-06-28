import { Model } from 'mongoose';
import { Opening } from './opening.model';
export declare class OpeningsService {
    private readonly openingModel;
    private openings;
    constructor(openingModel: Model<Opening>);
    insertOpening(jobtitle: string, location: string, EmployementType: string, Eligibility: string, Work: string, Note: string, skills: Array<string>, Date: Date, status: Boolean): Promise<string>;
    getOpenings(): Promise<Opening[]>;
    getSingleOpening(openingId: string): Promise<{
        id: string;
        jobtitle: string;
        location: string;
        EmployementType: string;
        Eligibility: string;
        Work: string;
        Note: string;
        skills: string[];
        Date: Date;
        status: Boolean;
    }>;
    updateOpening(openingId: string, jobtitle: string, location: string, EmployementType: string, Eligibility: string, Work: string, Note: string, skills: Array<string>, Date: Date, status: Boolean): Promise<void>;
    deleteOpening(openId: string): Promise<void>;
    private findOpening;
}
