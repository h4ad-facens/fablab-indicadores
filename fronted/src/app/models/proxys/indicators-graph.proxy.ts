import { IndicatorsProxy } from './indicators.proxy';

export interface IndicatorsGraph {
  totalMembers: number;
  totalStudents: number;
  totalStudentsPerMonth: IndicatorsProxy;
}
