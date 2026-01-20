import { z } from 'zod';
import { type FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
    title: z
        .string({ error: 'The diary title is required.' })
        .min(5, { message: 'The title must have at least 5 characters' }),
    emotion: z
        .string({ error: 'Please specify how are you feeling today.' })
        .min(3, {
            message: 'The emotion field must have at least 3 characters.'
        }),
    body: z
        .string({ error: 'Please write something for this diary' })
        .min(128, { message: 'Your diary must have at least 128 characters.' })
});

type FormData = z.infer<typeof schema>;

function AddDiaryForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormData>({ resolver: zodResolver(schema) });

    const onFormSubmit = (data: FieldValues) => {
        // Create diary id
        const uuid = crypto.randomUUID();
        data.id = uuid;

        // Add timestamp
        const now = new Date();
        data.createdAt = now.toLocaleDateString('en-GB', {
            timeZone: 'Europe/Berlin',
            year: 'numeric',
            month: 'long',
            day: '2-digit'
        });

        // Retrieve the diary from storage
        const hasDiary = localStorage.getItem('diaries');
        const diaries = hasDiary ? JSON.parse(hasDiary) : [];

        // Save diary entry to storage

        diaries.push(data);
        const newEntry = JSON.stringify(diaries);
        localStorage.setItem('diaries', newEntry);
        openDialog();
        reset();
    };

    const openDialog = () => {
        const modal = document.getElementById('success_modal').showModal();
        if (modal instanceof HTMLDialogElement) {
            modal.showModal();
        }
    };
    return (
        <>
            {/* Open the modal using document.getElementById('ID').showModal() method */}

            <dialog id="success_modal" className="modal">
                <div className="modal-box">
                    <h3 className="text-lg font-bold">Successfull!</h3>
                    <p className="py-4">
                        The diary entry was successfully saved!
                    </p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <form
                className="flex flex-col gap-3"
                onSubmit={handleSubmit(onFormSubmit)}
            >
                <label className="input w-full">
                    Diary Title
                    <input
                        type="search"
                        className="grow"
                        placeholder="Give your diary a nice title"
                        {...register('title')}
                    />
                </label>
                {errors.title && (
                    <span className="-mt-3 font-medium text-red-500">
                        {errors.title.message}
                    </span>
                )}

                <label className="form-control w-full">
                    How are you feeling today?
                    <select
                        id="emotions"
                        className="select w-full"
                        {...register('emotion')}
                    >
                        <option selected>Happy</option>
                        <option>Neutral</option>
                        <option>Sad</option>
                    </select>
                </label>

                {errors.emotion && (
                    <span className="-mt-3 font-medium text-red-500">
                        {errors.emotion.message}
                    </span>
                )}

                <textarea
                    className="textarea w-full"
                    placeholder="Write your diary here"
                    rows={20}
                    {...register('body')}
                ></textarea>

                {errors.body && (
                    <span className="-mt-3 font-medium text-red-500">
                        {errors.body.message}
                    </span>
                )}

                <button className="btn btn-primary">Save your diary</button>
            </form>
        </>
    );
}

export default AddDiaryForm;
