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
  LaborAttendance,
  ProjectAttendanceAnaTable,
  ProjectAttendanceDataAna,
  ProjectBudget,
  ProjectDesc,
  ProjectSelect,
  QuarterSelect,
  SmartHelmet,
  UnprocessedWarningList,
} from "../../schema-component";

export class DashboardBuildinPlugin extends Plugin {
  async load(): Promise<void> {
    this.app.addComponents({
      LaborAttendance,
      ProjectDesc,
      EmploymentCreditMng,
      SmartHelmet,
      KeyPersonArrived,
      UnprocessedWarningList,
      ClassicFrame,
      ClassicFrame5,

      Header1,
      Header5,
      ProjectBudget,
      HeaderMenu,

      ProjectAttendanceDataAna,
      ProjectAttendanceAnaTable,
      QuarterSelect,
      ProjectSelect,
      ChartTemplate,
    });
  }
}
