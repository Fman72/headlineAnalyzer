import DatabasePersistableObject from '../DatabasePersistableObject';

let promiseRejectionHandler = (error) => {
  console.warn(error.message);
}

import Article from '~/framework/articles/Article';

class DatedSource extends DatabasePersistableObject{
  constructor(sourceObject){
    super();
    if(sourceObject)
    {
      this.source = sourceObject.source;
      this.date = sourceObject.date;
      this.titleSentiment = sourceObject.titleSentiment;
      this.descriptionSentiment = sourceObject.descriptionSentiment;
    }
  }

  static getTableName(){
    return "datedsource";
  }

  static async generateDatedSources(after, before)
  {
    let whereClause = [];
    if(before)
    {
      whereClause.push(`UNIX_TIMESTAMP(publishedAt) < ${before}`);
    }
    if(after)
    {
      whereClause.push(`UNIX_TIMESTAMP(publishedAt) > ${after}`);
    }

    if(whereClause.length == 0){
      whereClause = "true";
    }
    else{
      whereClause = whereClause.join(' AND ');
    }

    try
    {
      let datedSources = await Article.getGroupedBy(['source', 'DATE(publishedAt)'], ['source', 'DATE(publishedAt) as date', 'AVG(titleSentiment) as titleSentiment', 'AVG(descriptionSentiment) as descriptionSentiment'], whereClause);
      datedSources.forEach((currentValue) => {
          let datedSource = new this(currentValue);
          datedSource.save();
      });
    }
    catch(error)
    {
      promiseRejectionHandler(error);
    }
  }

}

export default DatedSource;
