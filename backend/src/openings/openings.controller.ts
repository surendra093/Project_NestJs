import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    Req,
  } from '@nestjs/common';
  
import { OpeningsService } from './openings.service';

  
  @Controller('openings')
  export class OpeningsController {
    constructor(private readonly openingsService: OpeningsService) {}
  
    @Post()
    async  addOpening(
      @Body('jobtitle') openTitle: string,
      @Body('location') openLoc: string,
      @Body('EmployementType') openType: string,
      @Body('Eligibility') openEligibility: string,
      @Body('Work') openWork: string,
      @Body('Note') openNote: string,
      @Body('skills') openSkills: Array<string>,
      @Body('Date') openDate : Date,
      @Body('status') openStatus : Boolean

    ) {
      const generatedId =await this.openingsService.insertOpening(
            openTitle,
            openLoc,
            openType,
            openEligibility,
            openWork,
            openNote,
            openSkills,
            openDate,
            openStatus
      );
      return { id: generatedId };
    }
  
    @Get()
    async getAllOpenings() {
      const openings = await this.openingsService.getOpenings();
      return openings;
    }
  
    @Get(':id')
    getOpening(@Param('id') openId: string) {
      return this.openingsService.getSingleOpening(openId);
    }
  
    @Patch(':id')
    async updateOpening(
        @Param('id') openId: string,
        @Body('jobtitle') openTitle: string,
        @Body('location') openLoc: string,
        @Body('EmployementType') openType: string,
        @Body('Eligibility') openEligibility: string,
        @Body('Work') openWork: string,
        @Body('Note') openNote: string,
        @Body('skills') openSkills: Array<string>,
        @Body('Date') openDate : Date,
        @Body('status') openStatus : Boolean

    ) {
      await this.openingsService.updateOpening(openId,openTitle,openLoc,openType,openEligibility,openWork,openNote,openSkills,openDate,openStatus);
      return null;
    }
  
    @Delete(':id')
    async deleteOpening(@Param('id') openId: string) {
        await this.openingsService.deleteOpening(openId);
        return null;
    }
  }