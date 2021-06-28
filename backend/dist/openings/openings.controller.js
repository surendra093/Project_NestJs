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
exports.OpeningsController = void 0;
const common_1 = require("@nestjs/common");
const openings_service_1 = require("./openings.service");
let OpeningsController = class OpeningsController {
    constructor(openingsService) {
        this.openingsService = openingsService;
    }
    async addOpening(openTitle, openLoc, openType, openEligibility, openWork, openNote, openSkills, openDate, openStatus) {
        const generatedId = await this.openingsService.insertOpening(openTitle, openLoc, openType, openEligibility, openWork, openNote, openSkills, openDate, openStatus);
        return { id: generatedId };
    }
    async getAllOpenings() {
        const openings = await this.openingsService.getOpenings();
        return openings;
    }
    getOpening(openId) {
        return this.openingsService.getSingleOpening(openId);
    }
    async updateOpening(openId, openTitle, openLoc, openType, openEligibility, openWork, openNote, openSkills, openDate, openStatus) {
        await this.openingsService.updateOpening(openId, openTitle, openLoc, openType, openEligibility, openWork, openNote, openSkills, openDate, openStatus);
        return null;
    }
    async deleteOpening(openId) {
        await this.openingsService.deleteOpening(openId);
        return null;
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body('jobtitle')),
    __param(1, common_1.Body('location')),
    __param(2, common_1.Body('EmployementType')),
    __param(3, common_1.Body('Eligibility')),
    __param(4, common_1.Body('Work')),
    __param(5, common_1.Body('Note')),
    __param(6, common_1.Body('skills')),
    __param(7, common_1.Body('Date')),
    __param(8, common_1.Body('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, Array,
        Date,
        Boolean]),
    __metadata("design:returntype", Promise)
], OpeningsController.prototype, "addOpening", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OpeningsController.prototype, "getAllOpenings", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OpeningsController.prototype, "getOpening", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body('jobtitle')),
    __param(2, common_1.Body('location')),
    __param(3, common_1.Body('EmployementType')),
    __param(4, common_1.Body('Eligibility')),
    __param(5, common_1.Body('Work')),
    __param(6, common_1.Body('Note')),
    __param(7, common_1.Body('skills')),
    __param(8, common_1.Body('Date')),
    __param(9, common_1.Body('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, Array,
        Date,
        Boolean]),
    __metadata("design:returntype", Promise)
], OpeningsController.prototype, "updateOpening", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OpeningsController.prototype, "deleteOpening", null);
OpeningsController = __decorate([
    common_1.Controller('openings'),
    __metadata("design:paramtypes", [openings_service_1.OpeningsService])
], OpeningsController);
exports.OpeningsController = OpeningsController;
//# sourceMappingURL=openings.controller.js.map