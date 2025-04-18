import React, { useState } from "react";
import PostReqCourses from "./PostReqCourses";
import PreReqCourses from "./PreReqCourses";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { TreeNode } from "~/app/types";
import { CourseIDButton } from "./Buttons";

interface ReqTreeProps {
  root: TreeNode;
}

const ReqTreeDetail: React.FC<ReqTreeProps> = ({ root }) => {
  const [expandedPostReqIDs, setExpandedPostReqIDs] = useState<string[]>([]);
  const [expandedPreReqIDs, setExpandedPreReqIDs] = useState<string[]>([]);

  const togglePostReqs = (courseID: string) => {
    setExpandedPostReqIDs((prev) =>
      prev.includes(courseID)
        ? prev.filter((id) => id !== courseID)
        : [...prev, courseID]
    );
  };

  const togglePreReqs = (courseID: string) => {
    setExpandedPreReqIDs((prev) =>
      prev.includes(courseID)
        ? prev.filter((id) => id !== courseID)
        : [...prev, courseID]
    );
  };

  return (
    <div className="flex overflow-auto">
      {/* Padding */}
      <div className="flex-grow"></div>

      {/* Prereqs on the left */}
      {root.prereqs && root.prereqs.length > 0 && (
        <div className="flex flex-col items-end justify-center">
          {root.prereqs.map((prereq) => (
            <div
              key={prereq.courseID}
              className="flex items-center justify-center"
            >
              {/* Next level of prereqs */}
              {expandedPreReqIDs.includes(prereq.courseID) && (
                <div className="flex items-center justify-center">
                  <PreReqCourses courseID={prereq.courseID} />
                  <div className="w-3 h-0.5 bg-gray-400"></div>
                </div>
              )}

              {/* Expansion button */}
              <div
                className="text-gray-700 cursor-pointer rounded py-1 px-2 text-sm hover:bg-gray-50"
                onClick={() => togglePreReqs(prereq.courseID)}
              >
                {expandedPreReqIDs.includes(prereq.courseID) ? (
                  <div className="flex items-center">
                    <div className="mr-1 hidden md:block">Hide</div>
                    <ChevronRightIcon className="h-5 w-5" />
                  </div>
                ) : (
                  <div className="flex items-center">
                    <ChevronLeftIcon className="h-5 w-5" />
                  </div>
                )}
              </div>

              {/* Line right to expansion button */}
              <div className="w-3 h-0.5 bg-gray-400"></div>

              {/* Course ID button */}
              <CourseIDButton courseID={prereq.courseID} />

              {/* Line connector right to node */}
              {root.prereqs && root.prereqs.length > 1 && (
                <div className="w-3 h-0.5 bg-gray-400"></div>
              )}

              {/* Half vertical line for the first prereq in the list */}
              {root.prereqs &&
                root.prereqs.length > 1 &&
                root.prereqs.indexOf(prereq) === 0 && (
                  <div className="flex flex-col w-0.5 self-stretch">
                    <div className="h-1/2 self-stretch"></div>
                    <div className="w-0.5 h-1/2 bg-gray-400 self-stretch"></div>
                  </div>
                )}

              {/* Normal vertical Line connector */}
              {root.prereqs &&
                root.prereqs.length > 1 &&
                root.prereqs.indexOf(prereq) !== 0 &&
                root.prereqs.indexOf(prereq) !== root.prereqs.length - 1 && (
                  <div className="w-0.5 bg-gray-400 self-stretch"></div>
                )}

              {/* Half vertical line for the last prereq in the list */}
              {root.prereqs &&
                root.prereqs.length > 1 &&
                root.prereqs.indexOf(prereq) === root.prereqs.length - 1 && (
                  <div className="flex flex-col w-0.5 self-stretch">
                    <div className="w-0.5 h-1/2 bg-gray-400 self-stretch"></div>
                    <div className="h-1/2 self-stretch"></div>
                  </div>
                )}
            </div>
          ))}
        </div>
      )}

      {/* Main Course */}
      <div className="flex items-center">
        {/* Line left to node */}
        {root.prereqs && root.prereqs.length > 0 && (
          <div className="w-3 h-0.5 bg-gray-400"></div>
        )}

        {/* Main node */}
        <div className="font-bold text-center px-2 py-1 text-base bg-gray-200 text-gray-900 border border-gray-400 rounded shadow-md min-w-20">
          {root.courseID}
        </div>

        {/* Line right to node */}
        {root.postreqs && root.postreqs.length > 0 && (
          <div className="w-3 h-0.5 bg-gray-400"></div>
        )}
      </div>

      {/* Postreqs on the right */}
      {root.postreqs && root.postreqs.length > 0 && (
        <div className="flex flex-col items-start justify-center">
          {root.postreqs.map((postreq) => (
            <div
              key={postreq.courseID}
              className="flex items-center justify-center"
            >
              {/* Half vertical line for the first postreq */}
              {root.postreqs &&
                root.postreqs.length > 1 &&
                root.postreqs.indexOf(postreq) === 0 && (
                  <div className="flex flex-col w-0.5 self-stretch">
                    <div className="h-1/2 self-stretch"></div>
                    <div className="w-0.5 h-1/2 bg-gray-400 self-stretch"></div>
                  </div>
                )}

              {/* Normal vertical Line connector */}
              {root.postreqs &&
                root.postreqs.length > 1 &&
                root.postreqs.indexOf(postreq) !== 0 &&
                root.postreqs.indexOf(postreq) !== root.postreqs.length - 1 && (
                  <div className="w-0.5 bg-gray-400 self-stretch"></div>
                )}

              {/* Half vertical line for the last postreq */}
              {root.postreqs &&
                root.postreqs.length > 1 &&
                root.postreqs.indexOf(postreq) === root.postreqs.length - 1 && (
                  <div className="flex flex-col w-0.5 self-stretch">
                    <div className="w-0.5 h-1/2 bg-gray-400 self-stretch"></div>
                    <div className="h-1/2 self-stretch"></div>
                  </div>
                )}

              {/* Line left to node */}
              {root.postreqs && root.postreqs.length > 1 && (
                <div className="w-3 h-0.5 bg-gray-400"></div>
              )}

              {/* Course ID button */}
              <CourseIDButton courseID={postreq.courseID} />

              {/* Line right to node */}
              <div className="w-3 h-0.5 bg-gray-400"></div>

              {/* Expansion button */}
              <div
                className="text-gray-700 cursor-pointer rounded py-1 px-2 text-sm hover:bg-gray-50"
                onClick={() => togglePostReqs(postreq.courseID)}
              >
                {expandedPostReqIDs.includes(postreq.courseID) ? (
                  <div className="flex items-center">
                    <div className="mr-1 hidden md:block">Hide</div>
                    <ChevronLeftIcon className="h-5 w-5" />
                  </div>
                ) : (
                  <div className="flex items-center">
                    <ChevronRightIcon className="h-5 w-5" />
                  </div>
                )}
              </div>

              {/* Next level of postreqs */}
              {expandedPostReqIDs.includes(postreq.courseID) && (
                <div className="flex items-center justify-center">
                  <div className="w-3 h-0.5 bg-gray-400"></div>
                  <PostReqCourses courseID={postreq.courseID} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Padding */}
      <div className="flex-grow"></div>
    </div>
  );
};

export default ReqTreeDetail;
