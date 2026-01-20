import { useState } from 'react';

type Diary = {
    id: string;
    title: string;
    emotion: string;
    body: string;
    createdAt: string;
};
function DiaryList() {
    const [diaries, setDiaries] = useState<Diary[]>(() => {
        const hasDiaries = localStorage.getItem('diaries');
        if (!hasDiaries) return [];
        const diaryList = JSON.parse(hasDiaries);
        return diaryList;
    });

    return (
        <>
            <div className="grid grid-cols-2 gap-4">
                {diaries.map(diary => (
                    <div
                        className="rounded-lg bg-white p-4 transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:shadow-xl"
                        key={diary.id}
                    >
                        <h3 className="mb-2 text-xl font-bold capitalize">
                            {diary.title}
                        </h3>
                        <h4>Created at {diary.createdAt}</h4>
                    </div>
                ))}
            </div>
        </>
    );
}

export default DiaryList;
