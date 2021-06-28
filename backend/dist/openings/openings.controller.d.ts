import { OpeningsService } from './openings.service';
export declare class OpeningsController {
    private readonly openingsService;
    constructor(openingsService: OpeningsService);
    addOpening(openTitle: string, openLoc: string, openType: string, openEligibility: string, openWork: string, openNote: string, openSkills: Array<string>, openDate: Date, openStatus: Boolean): Promise<{
        id: string;
    }>;
    getAllOpenings(): Promise<import("./opening.model").Opening[]>;
    getOpening(openId: string): Promise<{
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
    updateOpening(openId: string, openTitle: string, openLoc: string, openType: string, openEligibility: string, openWork: string, openNote: string, openSkills: Array<string>, openDate: Date, openStatus: Boolean): Promise<any>;
    deleteOpening(openId: string): Promise<any>;
}
