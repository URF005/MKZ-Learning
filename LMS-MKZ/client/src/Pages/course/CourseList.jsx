import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import HomeLayout from "../../Layouts/HomeLayout";
import { getAllCourse } from "../../redux/slices/CourseSlice";
import CourseCard from "./CourseCard";

function CourseList() {
  const dispatch = useDispatch();
  const { courseData } = useSelector((state) => state?.course);

  async function loadCourses() {
    await dispatch(getAllCourse());
  }

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <HomeLayout>
      <div className="flex flex-col min-h-screen pt-20 md:pt-16 lg:pt-10 px-4 md:px-8 lg:px-20 gap-10 font-mulish">
        {/* Heading */}
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white text-center leading-snug">
          Explore all courses made by{" "}
          <span className="text-[#E4B122]">Industry Experts</span>
        </h1>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 md:gap-10 mb-16 w-full">
          {courseData?.length > 0 ? (
            courseData.map((course) => (
              <CourseCard key={course._id} data={course} />
            ))
          ) : (
            <p className="col-span-full text-center text-slate-400 text-lg">
              No courses available at the moment.
            </p>
          )}
        </div>
      </div>
    </HomeLayout>
  );
}

export default CourseList;
