import MainMenuItem from "@/components/MainMenuItem";
import { Building, CircleGauge, Printer, Users } from "lucide-react";

export default function MainMenu(props) {
  return (
    <div {...props}>
      <MainMenuItem
        text="Dashboard"
        link="dashboard"
        icon={<CircleGauge size={20} />}
      />
      <MainMenuItem
        text="Organizations"
        link="organizations"
        icon={<Building size={20} />}
      />
      <MainMenuItem
        text="Contacts"
        link="contacts"
        icon={<Users size={20} />}
      />
      <MainMenuItem
        text="Reports"
        link="reports"
        icon={<Printer size={20} />}
      />
    </div>
  );
}
