import { useState } from 'react';

function Tabs() {
    const [selectedTab, setSelectedTab] = useState('add');

    const handleToggleTab = (selectedTab: string) => {
        setSelectedTab(selectedTab);
    };
    return (
        <>
            <div role="tablist" className="tabs tabs-box tabs-sm">
                <a
                    role="tab"
                    className={`tab flex-1 ${selectedTab === 'add' && 'tab-active font-bold'}`}
                    onClick={() => handleToggleTab('add')}
                >
                    Add Entry
                </a>
                <a
                    role="tab"
                    className={`tab flex-1 ${selectedTab === 'diaries' && 'tab-active font-bold'}`}
                    onClick={() => handleToggleTab('diaries')}
                >
                    Diaries
                </a>
            </div>
        </>
    );
}

export default Tabs;
