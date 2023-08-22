import React from "react";
import {
  parseISO,
  getDate,
  getMonth,
  getYear,
  formatDistanceToNow,
  compareAsc,
  subDays,
  isWithinInterval,
} from "date-fns";
import { tr } from "date-fns/locale";

const Task = ({ taskObj, onComplete }) => {
  const dateNow = Date.now();
  const deadline = parseISO(taskObj.deadline);
  console.log("now: ", dateNow);
  console.log("deadline: ", deadline);

  const day = getDate(deadline);
  const month = getMonth(deadline);
  const year = getYear(deadline);

  const remainingTime = formatDistanceToNow(new Date(year, month, day), {
    locale: tr,
  });

  let lastWord = "";

  switch (compareAsc(dateNow, deadline)) {
    case -1:
      lastWord = " sonra";
      break;
    case 0:
      break;
    case 1:
      lastWord = " önce";
      break;
  }

  const message = remainingTime + lastWord;

  const borderDate = subDays(deadline, 3);
  /* 
  const bgClass = isWithinInterval(deadline, {
    start: borderDate,
    end: dateNow,
  })
    ? "bg-rose-300"
    : "bg-indigo-400"; */
  const bgClass = "";

  return (
    <div className="task">
      <h3>{taskObj.title}</h3>
      <div className={`deadline ${bgClass}`}>
        son teslim: <span>{message}</span>
      </div>
      <p>{taskObj.description}</p>
      <div>
        {taskObj.people.map((p) => (
          <span className="pill" key={p}>
            {p}
          </span>
        ))}
      </div>
      {onComplete && (
        <button onClick={() => onComplete(taskObj.id)}>Tamamlandı</button>
      )}
    </div>
  );
};

export default Task;
