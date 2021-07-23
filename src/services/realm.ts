import Realm from 'realm';

import {RepositorySchema} from '../schemas/Repository';

export async function getRelm() {
  const realm = await Realm.open({
    schema: [RepositorySchema],
  });

  return realm;
}
