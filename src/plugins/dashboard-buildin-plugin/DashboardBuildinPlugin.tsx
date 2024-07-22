import { Plugin } from "../../application";
import {
  ChartTemplate,
  ClassicFrame,
  ClassicFrame5,
  EmploymentCreditMng,
  Header1,
  Header5,
  HeaderMenu,
  KeyPersonArrived,
  ProjectAttendanceAnaTable,
  ProjectAttendanceDataAna,
  ProjectBudget,
  ProjectSelect,
  ProjectTypePercent,
  QuarterSelect,
  SmartHelmet,
  Statistic,
  UnprocessedWarningList,
} from "../../schema-component";

export class DashboardBuildinPlugin extends Plugin {
  async load(): Promise<void> {
    this.app.addComponents({
      EmploymentCreditMng,
      SmartHelmet,
      KeyPersonArrived,
      UnprocessedWarningList,
      ClassicFrame,
      ClassicFrame5,
      Statistic,
      Header1,
      Header5,
      ProjectBudget,
      ProjectTypePercent,
      HeaderMenu,

      ProjectAttendanceDataAna,
      ProjectAttendanceAnaTable,
      QuarterSelect,
      ProjectSelect,
      ChartTemplate,
    });
  }
}
