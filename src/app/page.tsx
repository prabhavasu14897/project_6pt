import { productConfig } from '@/config';
import { currentUser } from '@/data/prototype';
import { greetingFor, now } from '@/lib/utils';
import { PageHeader } from '@/components/layout/PageHeader';
import { DashboardHero } from '@/components/dashboard/DashboardHero';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { FamilyActivity } from '@/components/dashboard/FamilyActivity';
import { TaskOverview } from '@/components/dashboard/TaskOverview';
import { TodayEvents } from '@/components/dashboard/TodayEvents';

export default function HomePage() {
  const { dashboard } = productConfig;
  const user = currentUser();
  const greeting = user ? `${greetingFor(now())}, ${user.name}` : greetingFor(now());

  return (
    <div className="dashboard">
      <PageHeader title={greeting} description={dashboard.subtitle} showDate />
      <div className="dashboard__grid">
        <div className="dashboard__hero">
          <DashboardHero />
        </div>
        <div className="dashboard__stats">
          <DashboardStats />
        </div>
        <div className="dashboard__events">
          <TodayEvents />
        </div>
        <div className="dashboard__tasks">
          <TaskOverview />
        </div>
        <div className="dashboard__activity">
          <FamilyActivity />
        </div>
      </div>
    </div>
  );
}
