// get current year and display it in the footer
let currentYear = new Date().getFullYear();
document.querySelector('#currentYear').textContent = currentYear;

const fetchArticles = async (query, variables = {}) => {
  const response = await fetch('https://api.hashnode.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  return response.json();
};
const GET_ARTICLES = `
    query GetUserArticles($page: Int!) {
        user(username: "juanmendozadev") {
            publication {
                posts(page: $page) {
                    title
                    slug
                    coverImage
                }
            }
        }
    }
`;
(async function () {
  try {
    const result = await fetchArticles(GET_ARTICLES, { page: 0 });
    const articles = result.data.user.publication.posts;
    // remove duplicate objects from array
    const titles = articles.map((item) => item.title);
    const uniqueItems = articles.filter(
      (item, index) => !titles.includes(item.title, index + 1)
    );
    let container = document.createElement('div');
    container.classList.add('articles-container');
    uniqueItems.forEach((article) => {
      let articleBox = document.createElement('div');
      articleBox.classList.add('article-box');

      let header = document.createElement('header');
      let title = document.createElement('h3');
      title.classList.add('article-title');
      title.textContent = article.title;
      header.appendChild(title);
      articleBox.appendChild(header);

      let imageWrapper = document.createElement('div');
      imageWrapper.classList.add('previews-wrapper');
      let image = document.createElement('img');
      image.classList.add('cover-image');
      image.setAttribute('src', `${article.coverImage}`);
      image.setAttribute('alt', `Preview of article titled '${article.title}'`);
      image.setAttribute('loading', 'lazy');
      imageWrapper.appendChild(image);
      articleBox.appendChild(imageWrapper);

      let linkWrapper = document.createElement('div');
      linkWrapper.classList.add('buttons');
      let link = document.createElement('a');
      link.classList.add('options');
      link.setAttribute(
        'href',
        `https://juansebastian.hashnode.dev/${article.slug}`
      );
      link.setAttribute('rel', 'noopener noreferrer');
      link.setAttribute('target', '_blank');
      link.textContent = 'Read article';
      linkWrapper.appendChild(link);
      articleBox.appendChild(linkWrapper);

      //   Append every .article-box div to the .articles-container div
      container.appendChild(articleBox);
      //   Append everything to the #articles section
      document.querySelector('#articles').appendChild(container);
    });
  } catch (error) {
    console.error('er', error);
  }
})();
