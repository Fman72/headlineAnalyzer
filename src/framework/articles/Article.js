import DatabasePersistableObject from '../DatabasePersistableObject';

import sentimentAnalyzer from '~/app/sentimentAnalyzer';

import databaseHelper from '~/app/databaseHelper';

let promiseRejectionHandler = (error) => {
  console.warn(error.message);
}

const defaultFieldMapping = {
    title: 'title',
    description: 'description',
    author: 'author',
    url: 'url',
    publishedAt: 'publishedAt',
    source: 'source',
    category: 'category'
};

class Article extends DatabasePersistableObject
{

  constructor(articleObject, source, fieldMapping = false)
  {
    if(!fieldMapping)
    {
      fieldMapping = defaultFieldMapping;
    }
    super();
    if(articleObject.title){
      this.title = articleObject[fieldMapping['title'] || 'title'];
      this.description = articleObject[fieldMapping['description'] || 'description'];
      this.author = articleObject[fieldMapping['author'] || 'author'];
      this.url = articleObject[fieldMapping['url'] || 'url'];
      this.publishedAt = new Date(articleObject[fieldMapping['publishedAt']] || 'publishedAt');
      this.source = articleObject[fieldMapping['source'] || 'source'];
      this.category = articleObject[fieldMapping['category'] || 'category'] || null;
      if(typeof source === "string"){
        this.source = source;
      }
      else if(typeof source === "object"){
        this.source = source.id;
      }
      if(this.description)
      {
        this.descriptionSentiment = sentimentAnalyzer.analyzeText(this.description).score;
      }
      this.titleSentiment = sentimentAnalyzer.analyzeText(this.title).score;
    }
  }

  static getTableName()
  {
    return "article";
  }

  static async createAndSaveObjects(articlesJsonArray, source, fieldMapping = false)
  {
    let articles = articlesJsonArray.map((currentValue) => {
      return new this(currentValue, source, fieldMapping);
    });
    await this.saveObjects(articles);
    return articles;
  }

  static getArticlesBetween(firstDate, secondDate)
  {
    let queryString = `publishedAt > ${firstDate} AND publishedAt < ${secondDate}`;

  }

  static getArticlesBefore(beforeDate)
  {
    let queryString = `publishedAt < ${beforeDate}`;
    return Article.getObjectsWhere(queryString);
  }

  static getArticlesAfter(afterDate)
  {
    let queryString = `publishedAt > ${afterDate}`;
    return Article.getObjectsWhere(queryString);
  }

}

export default Article;
