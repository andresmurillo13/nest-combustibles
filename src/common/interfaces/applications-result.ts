import { Application } from "src/applications/entities/application.entity";

export interface ApplicationsResult {
    applications: Application[],
    totalApplications: number

}