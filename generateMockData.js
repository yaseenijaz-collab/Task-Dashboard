import fs from 'fs';

const departments = ['Engineering', 'Design', 'Product', 'QA', 'Management', 'DevOps'];
const teams = ['Core-Alpha', 'Zenith-Frontend', 'Nebula-Backend', 'Swift-Mobile', 'Titan-Platform', 'Growth-Squad'];
const roles = ['Admin', 'Manager', 'Employee'];
const statuses = ['To Do', 'In Progress', 'Done', 'Blocked'];
const priorities = ['Low', 'Medium', 'High', 'Critical'];
const projects = [
  { id: 'proj-1', name: 'Cloud Synergy Integration', key: 'CSI', description: 'Enterprise cloud migration and synergy.' },
  { id: 'proj-2', name: 'Quantum UI Revamp', key: 'QUI', description: 'Next-gen design system implementation.' },
  { id: 'proj-3', name: 'Sentinel Security Suite', key: 'SSS', description: 'Advanced threat detection and auth.' },
  { id: 'proj-4', name: 'Velocity Mobile v3', key: 'VEL', description: 'Performance optimized mobile application.' }
];

const generateUsers = (count) => {
  const users = [];
  const firstNames = ['James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];

  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;
    users.push({
      id: `user-${i + 1}`,
      name,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@enterprise-azure.com`,
      avatar: `https://i.pravatar.cc/150?u=user-${i + 1}`,
      role: i === 0 ? 'Admin' : (i < 10 ? 'Manager' : 'Employee'),
      department: departments[Math.floor(Math.random() * departments.length)],
      team: teams[Math.floor(Math.random() * teams.length)],
    });
  }
  return users;
};

const generateSprints = (projId) => {
  const sprints = [];
  for (let i = 1; i <= 6; i++) {
    sprints.push({
      id: `sprint-${projId}-${i}`,
      name: `Sprint ${i}`,
      projectId: projId,
      startDate: `2024-0${i}-01`,
      endDate: `2024-0${i}-14`,
      status: i === 5 ? 'Current' : (i < 5 ? 'Past' : 'Future'),
    });
  }
  return sprints;
};

const generateTasks = (users, sprints, count) => {
  const tasks = [];
  const taskPrefixes = ['Fix', 'Implement', 'Develop', 'Refactor', 'Test', 'Design', 'Deploy', 'Analyze'];
  const taskNouns = ['API Endpoint', 'User Authentication', 'Dashboard Widget', 'Mobile UI Screen', 'Database Schema', 'CI/CD Pipeline', 'Unit Tests', 'CSS Module'];

  for (let i = 0; i < count; i++) {
    const sprint = sprints[Math.floor(Math.random() * sprints.length)];
    const assignedUser = users[Math.floor(Math.random() * users.length)];
    const creator = users[Math.floor(Math.random() * users.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const est = Math.floor(Math.random() * 20) + 4;
    const logged = status === 'Done' ? est : Math.floor(Math.random() * est);

    tasks.push({
      id: `TASK-${1000 + i}`,
      title: `${taskPrefixes[Math.floor(Math.random() * taskPrefixes.length)]} ${taskNouns[Math.floor(Math.random() * taskNouns.length)]} for ${sprint.id}`,
      description: `Detailed technical requirement for ${taskNouns[Math.floor(Math.random() * taskNouns.length)]}. This task involves core development and rigorous testing within the ${sprint.name} timeframe.`,
      projectId: sprint.projectId,
      sprintId: sprint.id,
      status,
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      assignedTo: assignedUser.id,
      createdBy: creator.id,
      estimatedHours: est,
      loggedHours: logged,
      dueDate: sprint.endDate,
      createdAt: sprint.startDate,
      tags: ['Azure', 'DevOps', 'Sprint-Goal', assignedUser.department],
      attachments: i % 3 === 0 ? [{ id: `att-${i}`, name: 'spec.pdf', url: '#', type: 'pdf', size: '1.2MB' }] : [],
      comments: [
        { id: `c-${i}-1`, userId: creator.id, text: "Looking good, let's proceed.", timestamp: new Date().toISOString() }
      ],
      timeLogs: [
        { id: `log-${i}`, userId: assignedUser.id, hours: logged, date: new Date().toISOString(), comment: 'Working on core logic.' }
      ]
    });
  }
  return tasks;
};

const users = generateUsers(60);
let allSprints = [];
projects.forEach(p => {
  allSprints = allSprints.concat(generateSprints(p.id));
});
const tasks = generateTasks(users, allSprints, 350);

const mockData = {
  projects,
  sprints: allSprints,
  users,
  tasks
};

fs.writeFileSync('./src/data/mockData.json', JSON.stringify(mockData, null, 2));
console.log('Mock data generated successfully!');
