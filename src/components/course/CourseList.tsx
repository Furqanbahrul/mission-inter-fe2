import { useState, useEffect, useRef } from "react";

interface Course {
    id: number;
    title: string;
    description: string;
    teacher: string;
    job: string;
    img: string;
    profile: string;
}

export default function CourseList() {
    const [courses, setCourses] = useState<Course[]>(() => {
        const saved = localStorage.getItem("courses");
        return saved ? JSON.parse(saved) : [];
    });

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [teacher, setTeacher] = useState("");
    const [job, setJob] = useState("");
    const [image, setImage] = useState("");
    const [imageName, setImageName] = useState("");
    const [profileImg, setProfileImg] = useState("");
    const [profileImgName, setProfileImgName] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const idCounterRef = useRef(1);
    const courseFileRef = useRef<HTMLInputElement>(null);
    const profileFileRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        localStorage.setItem("courses", JSON.stringify(courses));
    }, [courses]);

    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = () => reject(new Error("Failed to read file"));
        });
    };

    const handleImageChange = async (
        e: React.ChangeEvent<HTMLInputElement>,
        type: "course" | "profile"
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            const base64 = await fileToBase64(file);
            if (type === "course") {
                setImage(base64);
                setImageName(file.name);
            }
            if (type === "profile") {
                setProfileImg(base64);
                setProfileImgName(file.name);
            }
        }
    };

    const addCourse = () => {
        if (!title || !description || !teacher || !job || !image || !profileImg) {
            alert("Isi semua field!");
            return;
        }
        const newCourse: Course = {
            id: idCounterRef.current++,
            title,
            description,
            teacher,
            job,
            img: image,
            profile: profileImg,
        };
        setCourses((prev) => [...prev, newCourse]);
        resetForm();
    };

    const updateCourse = () => {
        setCourses((prev) =>
            prev.map((c) =>
                c.id === editingId
                    ? { ...c, title, description, teacher, job, img: image, profile: profileImg }
                    : c
            )
        );
        resetForm();
    };

    const deleteCourse = (id: number) => {
        setCourses((prev) => prev.filter((c) => c.id !== id));
    };

    const editCourse = (course: Course) => {
        setEditingId(course.id);
        setTitle(course.title);
        setDescription(course.description);
        setTeacher(course.teacher);
        setJob(course.job);
        setImage(course.img);
        setProfileImg(course.profile);
    };

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setTeacher("");
        setJob("");
        setImage("");
        setImageName("");
        setProfileImg("");
        setProfileImgName("");
        setEditingId(null);
        if (courseFileRef.current) courseFileRef.current.value = "";
        if (profileFileRef.current) profileFileRef.current.value = "";
    };

    return (
        <div className="p-6 max-w-6xl mx-auto font-poppins">
            <h1 className="text-3xl font-extrabold mb-4 justify-center flex font-poppins text-amber-950">
                CRUD Course
            </h1>


            <div className="mb-6 p-4 rounded-lg shadow-xl bg-white space-y-2 font-poppins">
                <input
                    type="text"
                    placeholder="Judul Course"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 w-full rounded"
                />
                <textarea
                    placeholder="Deskripsi Course"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="border p-2 w-full rounded resize-none"
                />
                <input
                    type="text"
                    placeholder="Nama Pengajar"
                    value={teacher}
                    onChange={(e) => setTeacher(e.target.value)}
                    className="border p-2 w-full rounded"
                />
                <input
                    type="text"
                    placeholder="Jabatan"
                    value={job}
                    onChange={(e) => setJob(e.target.value)}
                    className="border p-2 w-full rounded"
                />

                <div className="py-2">
                    <label htmlFor="gambar-course" className="pb-1 block font-poppins">
                        Upload Gambar Course <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="file"
                        id="gambar-course"
                        ref={courseFileRef}
                        onChange={(e) => handleImageChange(e, "course")}
                        className="hidden"
                    />
                    <button
                        type="button"
                        onClick={() => courseFileRef.current?.click()}
                        className="w-full bg-green-400 text-white px-4 py-2 rounded font-poppins hover:bg-green-600 text-left"
                    >
                        {imageName || "Pilih Gambar Course"}
                    </button>
                </div>
                {image && (
                    <img src={image} alt="" className="w-24 h-24 mt-2 object-cover rounded" />
                )}

                <div className="py-2">
                    <label htmlFor="gambar-profile" className="pb-1 block font-poppins">
                        Upload Icon Profile <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="file"
                        id="gambar-profile"
                        ref={profileFileRef}
                        onChange={(e) => handleImageChange(e, "profile")}
                        className="hidden"
                    />
                    <button
                        type="button"
                        onClick={() => profileFileRef.current?.click()}
                        className="w-full bg-green-400 text-white px-4 py-2 rounded font-poppins hover:bg-green-600 text-left"
                    >
                        {profileImgName || "Pilih Icon Profile"}
                    </button>
                </div>


                {profileImg && (
                    <img
                        src={profileImg}
                        alt="preview"
                        className="w-16 h-16 mt-2 object-cover rounded-full"
                    />
                )}

                {editingId ? (
                    <div className="flex gap-2">
                        <button
                            onClick={updateCourse}
                            className="bg-yellow-500 text-white px-4 py-2 rounded"
                        >
                            Update
                        </button>
                        <button
                            onClick={resetForm}
                            className="bg-gray-400 text-white px-4 py-2 rounded"
                        >
                            Batal
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={addCourse}
                        className="bg-green-400 text-white px-4 py-2 rounded mt-2 hover:bg-green-600"
                    >
                        Tambah
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 py-10">
                {courses.length === 0 && (
                    <p className="text-gray-500">Belum ada course....</p>
                )}
                {courses.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-row md:flex-col bg-white border border-gray-200 rounded-xl w-full mx-auto shadow-md transition hover:shadow-lg overflow-hidden"
                    >
                        {/* Gambar: kecil di kiri (mobile) / penuh di atas (desktop) */}
                        <img
                            src={item.img}
                            alt="content"
                            className="w-28 h-28 md:w-full md:h-44 object-cover shrink-0 md:shrink"
                        />

                        {/* Konten */}
                        <div className="flex flex-col gap-1 md:gap-2 p-3 md:p-4 flex-1 min-w-0">
                            <p className="text-sm md:text-base font-bold text-gray-900 line-clamp-2 leading-snug">
                                {item.title}
                            </p>
                            <p className="hidden md:block text-sm text-gray-500 line-clamp-2">
                                {item.description}
                            </p>

                            {/* Profile */}
                            <div className="flex items-center gap-2 mt-auto md:mt-1">
                                <img
                                    src={item.profile}
                                    alt="profile"
                                    className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover shrink-0"
                                />
                                <div className="flex flex-col min-w-0">
                                    <span className="text-xs md:text-sm font-semibold text-gray-900 truncate">{item.teacher}</span>
                                    <p className="text-[10px] md:text-xs text-gray-500 truncate">{item.job}</p>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 mt-1 md:mt-0">
                                <button
                                    onClick={() => editCourse(item)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-xs md:text-sm"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteCourse(item.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs md:text-sm"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
