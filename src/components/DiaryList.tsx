import { useState } from 'react';
import { ImHappy2, ImNeutral2, ImSad2 } from 'react-icons/im';

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

    const [diaryEntry, setDiaryEntry] = useState<Diary | null>(null);

    const onViewDiary = (diary: Diary) => {
        setDiaryEntry(diary);
    };

    const closeDiary = () => {
        setDiaryEntry(null);
    };

    const onDeleteDiary = (id: string) => {
        const newDiaries = diaries.filter(diary => diary.id !== id);
        setDiaries(newDiaries);
        localStorage.setItem('diaries', JSON.stringify(newDiaries));
        closeDiary();
    };

    return (
        <>
            {!diaryEntry && (
                <div className="grid grid-cols-2 gap-4">
                    {diaries.map(diary => (
                        <div
                            className="rounded-lg bg-white p-4 transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:shadow-xl"
                            key={diary.id}
                            onClick={() => onViewDiary(diary)}
                        >
                            <h3 className="mb-2 text-xl font-bold capitalize">
                                {diary.title}
                            </h3>
                            <h4>Created at {diary.createdAt}</h4>
                        </div>
                    ))}
                </div>
            )}

            {diaries.length === 0 && (
                <div className="w-full rounded-xl bg-amber-50 p-3 text-center font-medium">
                    There is no diary yet
                </div>
            )}

            {diaryEntry && (
                <div className="relative flex max-h-160 flex-col overflow-y-scroll rounded-xl bg-white p-8">
                    {diaryEntry.emotion === 'Sad' ? (
                        <ImSad2
                            size={128}
                            className="absolute -top-3 -right-8 z-0 text-gray-200"
                        />
                    ) : diaryEntry.emotion === 'Happy' ? (
                        <ImHappy2
                            size={128}
                            className="absolute -top-3 -right-8 z-0 text-gray-200"
                        />
                    ) : (
                        <ImNeutral2
                            size={128}
                            className="absolute -top-3 -right-10 z-0 text-gray-200"
                        />
                    )}
                    <h2 className="mb-2 text-4xl font-bold">
                        {diaryEntry.title}
                    </h2>
                    <h3 className="mb-4 text-gray-500">
                        Created at {diaryEntry.createdAt}
                    </h3>
                    <p className="text-lg">{diaryEntry.body}</p>
                    <div className="flex justify-between gap-2">
                        <button
                            className="btn mt-2 flex-1"
                            onClick={() => onDeleteDiary(diaryEntry.id)}
                        >
                            Delete
                        </button>
                        <button
                            className="btn btn-secondary mt-2 flex-1"
                            onClick={closeDiary}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default DiaryList;
