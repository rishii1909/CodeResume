import { IconCreditCard, IconGauge, IconNews } from '@tabler/icons-react';
import { PieChart } from '@mantine/charts';
import { AppShell, Avatar, Badge, Button, Card, NavLink, ScrollArea, Text } from '@mantine/core';

const ProfilePage = () => {
  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: 'sm',
        // collapsed: { mobile: !opened },
      }}
    >
      <div className="p-6">
        {/* Profile Section */}
        <div className="flex items-center gap-4">
          <Avatar src="profile-pic.jpg" radius="xl" size="lg" />
          <div>
            <Text size="xl" className="font-bold">
              fishi_codes
            </Text>
            <Text size="sm" color="dimmed">
              Junior Full-Stack Developer
            </Text>
            <Badge color="blue">Top 5% in region</Badge>
          </div>
        </div>

        {/* Languages Chart */}
        <Card className="mt-6">
          <Text className="font-bold">Languages</Text>
          <Text size="sm" color="dimmed">
            The languages chart shows distribution of languages...
          </Text>
          <PieChart
            data={[
              { value: 40, name: 'JavaScript', color: 'blue' },
              { value: 20, name: 'CSS', color: 'red' },
            ]}
          />
        </Card>

        {/* Job Opportunities */}
        <Card className="mt-6">
          <Text className="font-bold">Seeking job opportunities?</Text>
          <Text size="sm" color="dimmed">
            GitRoll can uncover your value...
          </Text>
          <Button fullWidth className="mt-4">
            Publish My GitRoll+
          </Button>
        </Card>
      </div>
    </AppShell>
  );
};

export default ProfilePage;
