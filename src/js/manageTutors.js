import tutorData from "../data/tutors.json";

class TutorManager {
  constructor() {
    this.tutors = [];
    this.loadData();
  }

  loadData() {
    try {
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

      const tooltip = document.createElement("span");
      tooltip.className = "tooltip";
      const firstName = tutor.name.split(" ")[0];
      const availableDays = tutor.weekday
        .map(
          (day) =>
            [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ][day]
        )
        .join(", ");
      if (container.className === "cards-active") {
        card.className = "card active";
        tooltip.innerText = `${firstName} can help you today!`;
      } else {
        card.className = "card";
        tooltip.innerText = `${firstName} is available on ${availableDays}`;
      }
      card.append(tooltip);

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
  new TutorManager();
});
