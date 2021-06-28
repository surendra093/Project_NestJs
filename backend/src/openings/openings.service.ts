import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';

import { Opening } from './opening.model';


@Injectable()
export class OpeningsService {
  private openings: Opening[] = [];

  constructor(@InjectModel('Opening') private readonly openingModel:Model<Opening>){ }

    async insertOpening(
        jobtitle        : string,
        location        : string,
        EmployementType : string,
        Eligibility     : string,
        Work            : string,
        Note            : string,
        skills          : Array<string>,
        Date            : Date,
        status            : Boolean) {
        const newOpening = new this.openingModel({jobtitle,location,EmployementType,
            Eligibility,Work,Note,skills,Date,status});

        const result = await newOpening.save();
        //console.log(result);
        return result.id as string;
    }

    async getOpenings() {
        var mysort = { Date: -1 };
        const openings = await this.openingModel.find().sort(mysort).exec();
        return openings as Opening[];
    }

    async getSingleOpening(openingId: string) {
        const opening = await this.findOpening(openingId);
        return {
            id: opening.id,
            jobtitle: opening.jobtitle,
            location: opening.location,
            EmployementType: opening.EmployementType,
            Eligibility: opening.Eligibility,
            Work: opening.Work,
            Note: opening.Note,
            skills: opening.skills,
            Date  : opening.Date,
            status  : opening.status
        };
    }

    async updateOpening(
        openingId       : string,
        jobtitle        : string,
        location        : string,
        EmployementType : string,
        Eligibility     : string,
        Work            : string,
        Note            : string,
        skills          : Array<string>,
        Date            : Date,
        status          : Boolean
    ){
        const updatedOpening = await this.findOpening(openingId);
        if (jobtitle) {
            updatedOpening.jobtitle = jobtitle;
        }
        if (location) {
            updatedOpening.location = location;
        }
        if (EmployementType) {
            updatedOpening.EmployementType = EmployementType;
        }
        if (Eligibility) {
            updatedOpening.Eligibility = Eligibility;
        }
        if (Work) {
            updatedOpening.Work = Work;
        }
        if (Note) {
            updatedOpening.Note = Note;
        }
        if (skills) {
            updatedOpening.skills = skills;
        }
        if (Date) {
            updatedOpening.Date = Date;
        }
        
        if (status == false || true) {
            updatedOpening.status = status;
        }
       
        updatedOpening.save();
    }

    async deleteOpening(openId: string) {
        const result = await this.openingModel.deleteOne({_id: openId}).exec();
        if (result.n === 0) {
        throw new NotFoundException('Could not find product.');
        }
    }

    private async findOpening(id: string): Promise<Opening> {
        let opening;
        try {
        opening = await this.openingModel.findById(id).exec();
        } catch (error) {
        throw new NotFoundException('Could not find product.');
        }
        if (!opening) {
        throw new NotFoundException('Could not find product.');
        }
        return opening;
    }
}