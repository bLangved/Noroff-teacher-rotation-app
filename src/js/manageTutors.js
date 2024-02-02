import { fetchTutors } from "./fetchTutor.js";

class TutorManager {
  constructor() {
    this.tutors = [];
  }

  async loadData() {
    try {
      const tutorData = await fetchTutors();
      this.tutors = tutorData;
      this.renderActiveTutors();
      this.renderInactiveTutors();
    } catch (error) {
      console.error("Error loading tutor data:", error);
    }
  }

  getActiveTutors() {
    const currentDayOfWeek = new Date().getDay();
    return this.tutors.filter((tutor) =>
      tutor.weekday.includes(currentDayOfWeek)
    );
  }

  getInactiveTutors() {
    const currentDayOfWeek = new Date().getDay();
    return this.tutors.filter(
      (tutor) => !tutor.weekday.includes(currentDayOfWeek)
    );
  }

  renderTutors(container, tutors) {
    tutors.forEach((tutor) => {
      const link = document.createElement("a");
      link.setAttribute("href", tutor.contact);
      link.setAttribute("target", "_blank");

      const card = document.createElement("div");
      card.id = `tutorId${tutor.id}`;
      if (container.className === "cards-active") {
        card.className = "card active";
      } else {
        card.className = "card";
      }

      const img = document.createElement("img");
      img.setAttribute("src", tutor.avatar);
      img.setAttribute("alt", `An image of ${tutor.name}`);

      const name = document.createElement("span");
      name.innerText = tutor.name;

      card.append(img, name);
      link.append(card);
      container.append(link);
    });
  }
  renderActiveTutors() {
    const container = document.querySelector(".cards-active");
    const activeTutors = this.getActiveTutors();
    this.renderTutors(container, activeTutors);
  }

  renderInactiveTutors() {
    const container = document.querySelector(".cards-inactive");
    const inactiveTutors = this.getInactiveTutors();
    this.renderTutors(container, inactiveTutors);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const tutorManager = new TutorManager();
  tutorManager.loadData();
});
