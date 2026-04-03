// progress.js

const PROGRESS_KEY = "PAZ_LMS_MATE7_PROGRESS";
const EXAMS_KEY = "PAZ_LMS_MATE7_EXAMS";

function getProgress() {
  const data = localStorage.getItem(PROGRESS_KEY);
  return data ? JSON.parse(data) : {};
}

function saveProgress(progress) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

function markTopicCompleted(moduleId, topicId) {
  const progress = getProgress();

  if (!progress[moduleId]) {
    progress[moduleId] = {};
  }

  progress[moduleId][topicId] = true;
  saveProgress(progress);
}

function isTopicCompleted(moduleId, topicId) {
  const progress = getProgress();
  return progress[moduleId] && progress[moduleId][topicId] === true;
}

function resetProgress() {
  localStorage.removeItem(PROGRESS_KEY);
  localStorage.removeItem(EXAMS_KEY);
}

function getGeneralProgress(courseData) {
  let totalTopics = 0;
  let completedTopics = 0;

  courseData.modules.forEach(mod => {
    mod.topics.forEach(topic => {
      totalTopics++;
      if (isTopicCompleted(mod.id, topic.id)) completedTopics++;
    });
  });

  const percent = totalTopics === 0 ? 0 : Math.round((completedTopics / totalTopics) * 100);

  return {
    totalTopics,
    completedTopics,
    percent
  };
}

function saveExamResult(moduleId, score, total) {
  const data = localStorage.getItem(EXAMS_KEY);
  const exams = data ? JSON.parse(data) : {};

  exams[moduleId] = {
    score: score,
    total: total,
    percent: Math.round((score / total) * 100),
    date: new Date().toISOString()
  };

  localStorage.setItem(EXAMS_KEY, JSON.stringify(exams));
}

function getExamResult(moduleId) {
  const data = localStorage.getItem(EXAMS_KEY);
  const exams = data ? JSON.parse(data) : {};
  return exams[moduleId] || null;
}
