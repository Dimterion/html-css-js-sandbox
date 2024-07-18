const projects = [
  {
    project: {
      src: "../assets/Avatar (md).png",
      projectName: "Blog",
      tech: "React",
    },
    type: "demo",
    projectDate: "2024-06-04T12:00:00",
    link: "https://github.com/Dimterion",
  },
  {
    project: {
      src: "../assets/Avatar (md).png",
      projectName: "Expense Tracker",
      tech: "Next.js",
    },
    type: "demo",
    projectDate: "2024-07-04T12:00:00",
    link: "https://github.com/Dimterion",
  },
  {
    project: {
      src: "../assets/Avatar (md).png",
      projectName: "Crypto Finder",
      tech: "React",
    },
    type: "demo",
    projectDate: "2024-07-04T12:00:00",
    link: "https://github.com/Dimterion",
  },

  {
    project: {
      src: "../assets/Avatar (md).png",
      projectName: "Portfolio Site",
      tech: "HTML/CSS/JS",
    },
    type: "repo",
    projectDate: "2024-06-05T10:00:00",
    link: "https://github.com/Dimterion",
  },
  {
    project: {
      src: "../assets/Avatar (md).png",
      projectName: "",
      tech: "",
    },
    type: "",
    projectDate: "2024-07-04T12:00:00",
    link: "https://github.com/Dimterion",
  },
  {
    project: {
      src: "../assets/Avatar (md).png",
      projectName: "",
      tech: "",
    },
    type: "",
    projectDate: "2024-07-03T11:00:00",
    link: "https://github.com/Dimterion",
  },

  {
    project: {
      src: "../assets/Avatar (md).png",
      projectName: "",
      tech: "",
    },
    type: "",
    projectDate: "2024-07-04T12:00:00",
    link: "https://github.com/Dimterion",
  },
  {
    project: {
      src: "../assets/Avatar (md).png",
      projectName: "",
      tech: "",
    },
    type: "",
    projectDate: "2024-07-12T12:00:00",
    link: "https://github.com/Dimterion",
  },
];

const tableWidget = document.getElementsByClassName("table-widget");

const itemsOnPage = 4;

const numberOfPages = Math.ceil(projects.length / itemsOnPage);

const start = new URLSearchParams(window.location.search).get("page") || 1;

const mappedRecords = projects
  .filter(
    (_, i) => (start - 1) * itemsOnPage < i + 1 && i + 1 <= start * itemsOnPage
  )
  .map((project) => {
    return `<tr>
              <td class="profile-td">
                  <img
                      src="${project.project.src}"
                      alt="${project.project.tech}"
                  >
                  <span class="profile-info">
                      <span class="profile-info__name">
                          ${project.project.projectName}
                      </span>
                      <span class=profile-info__alias>
                          ${project.project.tech}
                      </span>
                  </span>
              </td>
              <td>
                  <a href=${project.link} 
                  target="_blank"
                  rel="noopener noreferrer"
                  class='project-type project-type--${project.type}'>
                      ${project.type.toUpperCase()}
                  </a>
              </td>
              <td>
                  ${new Date(project.projectDate).toLocaleDateString("en-us", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
              </td>
          </tr>`;
  });

const linkList = [];

for (let i = 0; i < numberOfPages; i++) {
  const pageNumber = i + 1;
  linkList.push(
    `<li>
          <a
              href="?page=${pageNumber}" 
              ${pageNumber == start ? 'class="active"' : ""} 
              title="page ${pageNumber}">
              ${pageNumber}
          </a>
      </li>`
  );
}

const table = `
  <table>
      <caption>
          All Projects
          <div class="table-row-count">
              <div class="status"></div>
              (${projects.length}) Projects
          </div>
      </caption> 
      <thead>
          <tr>
              <th>Project</th>
              <th>Link</th>
              <th>Date</th>
          </tr>
      </thead>
      <tbody id="table-rows">
          ${mappedRecords.join("")}
      </tbody>
      <tfoot>
          <tr>
              <td colspan="6">
                  <ul class="pagination">
                      <!--? generated pages -->
                      ${linkList.join("")}
                  </ul>
              </td>
          </tr>
      </tfoot>
</table>`;

tableWidget[0].innerHTML = table;
