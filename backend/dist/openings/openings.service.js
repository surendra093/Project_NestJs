"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpeningsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let OpeningsService = class OpeningsService {
    constructor(openingModel) {
        this.openingModel = openingModel;
        this.openings = [];
    }
    async insertOpening(jobtitle, location, EmployementType, Eligibility, Work, Note, skills, Date, status) {
        const newOpening = new this.openingModel({ jobtitle, location, EmployementType,
            Eligibility, Work, Note, skills, Date, status });
        const result = await newOpening.save();
        return result.id;
    }
    async getOpenings() {
        var mysort = { Date: -1 };
        const openings = await this.openingModel.find().sort(mysort).exec();
        return openings;
    }
    async getSingleOpening(openingId) {
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
            Date: opening.Date,
            status: opening.status
        };
    }
    async updateOpening(openingId, jobtitle, location, EmployementType, Eligibility, Work, Note, skills, Date, status) {
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
    async deleteOpening(openId) {
        const result = await this.openingModel.deleteOne({ _id: openId }).exec();
        if (result.n === 0) {
            throw new common_1.NotFoundException('Could not find product.');
        }
    }
    async findOpening(id) {
        let opening;
        try {
            opening = await this.openingModel.findById(id).exec();
        }
        catch (error) {
            throw new common_1.NotFoundException('Could not find product.');
        }
        if (!opening) {
            throw new common_1.NotFoundException('Could not find product.');
        }
        return opening;
    }
};
OpeningsService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Opening')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], OpeningsService);
exports.OpeningsService = OpeningsService;
//# sourceMappingURL=openings.service.js.map