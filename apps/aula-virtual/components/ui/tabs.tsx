"use client"

import { ReactNode, useState } from "react"

interface Tab {
  id: string
  label: string
  icon?: ReactNode
  content: ReactNode
}

interface TabsProps {
  tabs: Tab[]
  defaultTab?: string
}

export function Tabs({ tabs, defaultTab }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content

  return (
    <div className="w-full">
      {/* Tab headers */}
      <div className="border-b border-gray-200">
        <div className="flex gap-1 overflow-x-auto scrollbar-hide sm:overflow-x-visible sm:scrollbar-default">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-6 py-3 font-medium text-sm transition-colors
                border-b-2 -mb-px
                whitespace-nowrap
                ${activeTab === tab.id
                  ? "border-secondary text-gray-700 bg-secondary/10 uppercase"
                  : "text-gray-700 hover:text-secondary hover:bg-gray-50 uppercase"
                }
              `}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="py-6">
        {activeTabContent}
      </div>
    </div>
  )
}
