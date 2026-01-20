import { useState } from 'react';
import AddDiaryForm from './components/AddDiaryForm';
import DiaryList from './components/DiaryList';
import Tabs from './components/Tabs';

function App() {
    const [currentTab, setCurrentTab] = useState('diaries');

    const handleTab = (selectedTab: string) => {
        setCurrentTab(selectedTab);
    };
    return (
        <>
            <div className="mx-auto flex w-160 flex-col py-4">
                <div className="flex w-full flex-col gap-2 rounded-2xl bg-amber-100 p-4">
                    {/* Header  */}

                    <header>
                        <h1 className="mb-4 border-b border-gray-200 pb-3 text-2xl font-bold">
                            Diary App
                        </h1>

                        <p>
                            Embrace each day with reflection: Capture your
                            moments, chart your growth, and craft your journey,
                            one story at a time
                        </p>
                    </header>
                    {/* Tab */}
                    <Tabs onSelectedTab={handleTab} />

                    {/* Form  */}
                    <div className="flex flex-col gap-3 rounded-xl bg-amber-200 p-4">
                        {currentTab === 'add' ? (
                            <AddDiaryForm />
                        ) : (
                            <DiaryList />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
