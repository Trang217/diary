import Tabs from './components/Tabs';

function App() {
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
                    <Tabs />

                    {/* Form  */}

                    <form className="flex flex-col gap-3">
                        <label className="input w-full">
                            Diary Title
                            <input
                                type="search"
                                className="grow"
                                placeholder="Give your diary a nice title"
                            />
                        </label>

                        <label className="form-control w-full">
                            How are you feeling today?
                            <select id="emotions" className="select w-full">
                                <option selected>Happy</option>
                                <option>Amber</option>
                                <option>Velvet</option>
                            </select>
                        </label>

                        <textarea
                            className="textarea w-full"
                            placeholder="Write your diary here"
                            rows={20}
                        ></textarea>

                        <button className="btn btn-primary">
                            Save your diary
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default App;
