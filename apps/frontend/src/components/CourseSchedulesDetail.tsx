import { sessionToString, timeArrToString } from "~/app/utils";
import React from "react";
import { Tab } from "@headlessui/react";
import { Lecture, Schedule, Section } from "~/app/types";
import Link from "./Link";

const getInstructors = (instructors: string[]) => {
  return (
    <>
      {instructors.map((instructor, index) => {
        if (index === instructors.length - 1)
          return (
            <Link
              key={`${instructor}-${index}`}
              href={`/instructor/${instructor.toUpperCase()}`}
            >
              {instructor}
            </Link>
          );
        return (
          <div key={`${instructor}-${index}`}>
            <Link href={`/instructor/${instructor.toUpperCase()}`}>
              {instructor}
            </Link>
            ;{" "}
          </div>
        );
      })}
    </>
  );
};

const LectureViewer = ({
  lectureInfo,
  sections,
  courseID,
}: {
  lectureInfo: Lecture;
  sections: Section[];
  courseID: string;
}) => {
  return (
    <>
      <div className="contents rounded text-gray-700 hover:bg-gray-50">
        <div className="text-md col-span-1 pt-2 font-bold">
          {lectureInfo.name}
        </div>
        <div className="col-span-1 text-sm">
          {getInstructors(lectureInfo.instructors)}
        </div>
        <div className="contents flex-col text-sm">
          {lectureInfo.times.map((time, i) => (
            <div
              className="contents"
              key={`${courseID}-lecture-${timeArrToString([time])}-${i}`}
            >
              <div className="col-span-1 col-start-3">
                {timeArrToString([time])}
              </div>
              <Link
                href={`https://maps.scottylabs.org/${time.building}-${time.room}`}
                openInNewTab={true}
              >
                {time.building} {time.room}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {sections.map((section, i) => (
        <div
          className="contents text-gray-600 hover:bg-gray-50"
          key={`${courseID}-section-${section.name}-${i}`}
        >
          <div className="text-md col-span-1 pt-1">{section.name}</div>
          <div className="col-span-1 text-sm">
            {section.instructors.join("; ")}
          </div>
          <div className="contents text-sm">
            {section.times.map((time, i) => (
              <div
                className="contents"
                key={`${courseID}-section-${timeArrToString([time])}-${i}`}
              >
                <div className="col-span-1 col-start-3">
                  {timeArrToString([time])}
                </div>
                <Link
                  href={`https://maps.scottylabs.org/${time.building}-${time.room}`}
                  openInNewTab={true}
                >
                  {time.building} {time.room}
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

const ScheduleViewer = ({ scheduleInfo }: { scheduleInfo: Schedule }) => {
  let scheduleDivs;

  if (scheduleInfo.lectures.length !== 0) {
    scheduleDivs = scheduleInfo.lectures.map((lecture, i) => (
      <LectureViewer
        key={`${scheduleInfo.courseID}-${lecture.name}-${i}`}
        lectureInfo={lecture}
        sections={scheduleInfo.sections.filter(
          (section) => section.lecture === lecture.name
        )}
        courseID={scheduleInfo.courseID}
      />
    ));
  } else {
    scheduleDivs = scheduleInfo.sections.map((section, i) => (
      <LectureViewer
        key={`${scheduleInfo.courseID}-${section.name}-${i}`}
        lectureInfo={section}
        sections={[]}
        courseID={scheduleInfo.courseID}
      />
    ));
  }
  return (
    <div className="grid grid-cols-[auto_auto_auto_auto] items-baseline gap-x-4 overflow-x-auto whitespace-nowrap p-2">
      {scheduleDivs}
    </div>
  );
};

export const CourseSchedulesDetail = ({
  scheduleInfos,
}: {
  scheduleInfos: Schedule[];
}) => {
  return (
    <Tab.Group>
      <Tab.List className="mt-2 space-x-1 overflow-x-auto whitespace-nowrap rounded p-2 bg-gray-50">
        {scheduleInfos.map((scheduleInfo) => {
          const label = sessionToString(scheduleInfo);
          return (
            <Tab
              key={label}
              className={({ selected }) =>
                "inline-block rounded px-2 py-1 text-sm text-gray-800 hover:bg-white " +
                (selected ? "bg-white" : "")
              }
            >
              {label}
            </Tab>
          );
        })}
      </Tab.List>
      <Tab.Panels>
        {scheduleInfos.map((scheduleInfo) => (
          <Tab.Panel key={sessionToString(scheduleInfo)}>
            <ScheduleViewer scheduleInfo={scheduleInfo} />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};
