import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from 'react';
import { Header, MainContainer, ProjectTab, Title } from "./styles";
import StepsTab from "./tabs/stepsTab";
import RolesTab from "./tabs/rolesTab";

export default function ProjectView({ title, projectInfo, items }) {
  const [activeTab, setActiveTab] = useState("1");

  const tabs = [
    {
      id: "1",
      name: 'Etapas',
      content: <StepsTab steps={items} />
    },
    {
      id: "2",
      name: 'Organigrama',
      content: <div>organigrama</div>
    },
    {
      id: "3",
      name: 'Roles y permisos',
      content: <RolesTab />
    }
  ];

  return (
    <MainContainer>
      <TabContext value={activeTab}>
        <Header position='static'>
          <Title>{title}</Title>
          <TabList
            onChange={(_, newActiveTab) => setActiveTab(newActiveTab)}
            TabIndicatorProps={{ sx: { height: 4, backgroundColor: 'white' } }}
          >
            {tabs.map((tab) => (
              <ProjectTab
                label={tab.name}
                key={tab.id}
                value={tab.id}
              />
            ))}
          </TabList>
        </Header>
        {tabs.map((tab) => (
          <TabPanel key={tab.id} value={tab.id}>
            {tab.content}
          </TabPanel>
        ))}
      </TabContext>
    </MainContainer>
  );
}