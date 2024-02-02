export async function fetchTutors() {
  try {
    const response = await fetch("/src/data/tutors.json");
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
