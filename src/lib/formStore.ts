export interface FormSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  submittedAt: string;
}

const STORAGE_KEY = "prototype_form_submissions";

export const getSubmissions = (): FormSubmission[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const addSubmission = (submission: Omit<FormSubmission, "id" | "submittedAt">) => {
  const submissions = getSubmissions();
  submissions.unshift({
    ...submission,
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
};
