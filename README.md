<div align="center">

<img src="https://skillicons.dev/icons?i=react,ts,tailwind,vite" />

<br/>

![GitHub last commit](https://img.shields.io/github/last-commit/Tristan-DW/forge-ui?style=for-the-badge&color=6e40c9)
![GitHub stars](https://img.shields.io/github/stars/Tristan-DW/forge-ui?style=for-the-badge&color=f0883e)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-238636?style=for-the-badge)

# forge-ui

> **React + TypeScript component library and dashboard kit - built for speed and consistency.**

</div>

---

## Overview

**forge-ui** is a production-ready component library built on React, TypeScript, and Tailwind CSS. It ships with a full suite of UI primitives, data display components, form controls, and a pre-built dashboard layout - everything needed to build polished web applications fast.

---

## Components

| Category | Components |
|---|---|
| **Layout** | `Container`, `Grid`, `Stack`, `Divider` |
| **Navigation** | `Navbar`, `Sidebar`, `Breadcrumb`, `Tabs` |
| **Data Display** | `Table`, `Card`, `Badge`, `Stat`, `Avatar` |
| **Forms** | `Input`, `Select`, `Checkbox`, `Switch`, `DatePicker` |
| **Feedback** | `Alert`, `Toast`, `Modal`, `Spinner`, `Skeleton` |
| **Charts** | `LineChart`, `BarChart`, `DonutChart`, `AreaChart` |

---

## Quick Start

```bash
git clone https://github.com/Tristan-DW/forge-ui.git
cd forge-ui

npm install
npm run dev
```

App runs at `http://localhost:5173`

---

## Usage

```tsx
import { Card, Badge, Stat, Table } from './components';

export default function Dashboard() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Stat label="Total Users" value="12,483" change="+8.2%" trend="up" />
      <Stat label="Revenue" value="$94,210" change="+12.5%" trend="up" />
      <Stat label="Churn Rate" value="2.1%" change="-0.4%" trend="down" />

      <Card className="col-span-3">
        <Table
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'status', label: 'Status', render: (v) => <Badge variant={v}>{v}</Badge> },
            { key: 'created', label: 'Created' },
          ]}
          data={users}
        />
      </Card>
    </div>
  );
}
```

---

## Project Structure

```
forge-ui/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   ├── navigation/
│   │   ├── data-display/
│   │   ├── forms/
│   │   ├── feedback/
│   │   └── charts/
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   ├── types/          # TypeScript definitions
│   └── App.tsx
├── public/
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add my feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

---

<div align="center">

<sub>Architected by <a href="https://github.com/Tristan-DW">Tristan</a> - Head Architect</sub>

</div>
