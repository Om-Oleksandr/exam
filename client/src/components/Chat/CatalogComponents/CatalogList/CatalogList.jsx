import React from 'react';
import { connect } from 'react-redux';
import Catalog from '../Catalog/Catalog';
import styles from '../CatalogListContainer/CatalogListContainer.module.sass';
import {
  changeShowModeCatalog,
  deleteCatalogSql,
} from '../../../../store/slices/chatSlice';

const CatalogList = props => {
  const { catalogList } = props;
  const goToCatalog = (event, catalog) => {
    props.changeShowModeCatalog(catalog);
    event.stopPropagation();
  };

  const deleteCatalog = (event, catalogId) => {
    props.deleteCatalogSql({ catalogId });
    event.stopPropagation();
  };
  const mapCatalogs = elem => (
    <Catalog
      catalog={elem}
      key={elem.id}
      deleteCatalog={deleteCatalog}
      goToCatalog={goToCatalog}
    />
  );

  return (
    <div className={styles.listContainer}>
      {catalogList.length > 0 ? (
        catalogList.map(mapCatalogs)
      ) : (
        <span className={styles.notFound}>Not found</span>
      )}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  changeShowModeCatalog: data => dispatch(changeShowModeCatalog(data)),
  deleteCatalogSql: data => dispatch(deleteCatalogSql(data)),
});

export default connect(null, mapDispatchToProps)(CatalogList);
