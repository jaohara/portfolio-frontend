import { FC, useState, useEffect } from "react";
import { Link, Route, Switch, useParams } from "react-router-dom";

// TODO: Get this working for the form routes
// import { CSSTransition } from "react-transition-group";

import JsxParser from "react-jsx-parser";

import { AdminFormRouteParams, ModelAdminProps } from "../PropInterfaces";
import { Page } from "../Types";

import { fetchData, highlightSearchTerms, notNullOrUndefined, unbindFormSubmissionHotkey } 
  from "../common/Helpers";

import AdminControls from "./common/AdminControls";
import AdminDataLength from "./common/AdminDataLength";
import AdminTableDeleteCell from "./common/AdminTableDeleteCell";
import AdminTableTooltipCell from "./common/AdminTableTooltipCell";
import AdminTableVisibleCell from './common/AdminTableVisibleCell';
import AdminLoading from "./common/AdminLoading";

import PageForm from "./PageForm";

const PageAdmin: FC<ModelAdminProps> = ({ borderChangeCallback }) => {
  // const [ error, setError ]         = useState(null);
  const [ , setError ]         = useState(null);
  const [ filter, setFilter ]       = useState("");
  const [ isLoaded, setIsLoaded ]   = useState(false);
  const [ pages, setPages ]         = useState([]);

  let { editName } = useParams<AdminFormRouteParams>();

  useEffect(() => {
    unbindFormSubmissionHotkey();
    borderChangeCallback !== undefined && borderChangeCallback("page");
    fetchPages();
  }, []);

  const fetchPages = () => fetchData("/pages/all", setIsLoaded, setPages, setError);

  const createEmptyPage = () => ({
    body: "",
    hidden: true,
    name: "",
    pretty_name: "",
  } as Page);

  // hmmm... this is reused in all of my models. could I make this generic?
  const getPageIfExists = () => {
    let result = createEmptyPage();

    if (notNullOrUndefined(pages)) {
      let filterResult = pages.filter((page: Page) => page.name === editName);

      result = filterResult.length > 0 ? filterResult[0] : result;
    }

    return result;
  };

  return (
    <div className="admin-panel-pages">
      {
        !isLoaded ? <AdminLoading destination="page"/> : (
          <Switch>
            <Route key="create" path="/admin/pages/create">
              <PageForm
                backCallback={fetchPages}
                initialData={createEmptyPage() as Page}
              />
            </Route>

            <Route key="edit" path="/admin/pages/edit/:editName">
              <PageForm
                backCallback={fetchPages}
                initialData={getPageIfExists() as Page}
              />
            </Route>

            <Route key="overview" exact={true} path="/admin/pages">
              <AdminControls 
                filterOnChange={setFilter}
                filterValue={filter}
                modelName="Page"
              />

              {
                pages.length > 0 ? (
                <div className="admin-table-wrapper">
                  <AdminDataLength
                    dataLength={pages.length}
                    modelName="Page"
                  />

                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th className="no-restricted-width">
                          Page Name
                        </th>
                        <AdminTableTooltipCell 
                          cellContent="Visible?"
                          tooltipText="Whether or not the Page is visible on the navbar."
                        />
                        <AdminTableTooltipCell 
                          cellContent="Delete?"
                          tooltipText="Permanently deletes the given Page."
                        />
                      </tr>
                    </thead>

                    <tbody>
                      {
                        pages.map((page: any) => (
                          (filter.length === 0 ||
                            page.pretty_name.toLowerCase().match(filter.toLowerCase()) !== null) && (
                          <tr key={page.name}>
                            <td className="no-restricted-width no-color">
                              <Link 
                                className="admin-table-edit-link"
                                to={`/admin/pages/edit/${page.name}`}
                              >
                                {
                                  filter.length === 0 ? page.pretty_name :
                                  (
                                    <JsxParser
                                      jsx={highlightSearchTerms(page.pretty_name, filter)}
                                    />
                                  )
                                }
                              </Link>
                            </td>

                            <AdminTableVisibleCell
                              initialVisibility={!page.hidden}
                              invertedModel={true}
                              primaryKey={page.name}
                              toggleKey="hidden"
                              toggleRoute="/pages/update"
                            />

                            <AdminTableDeleteCell
                              deletionKey="name"
                              deletionRoute="/pages/delete"
                              deletionValue={page.name}
                              successCallback={fetchPages}
                            />
                          </tr>
                        )))
                      }
                    </tbody>
                  </table>
                </div> ) : (
                <p>
                  There are no Pages saved.
                </p>)
              }
            </Route>
          </Switch>
        )
      }   
    </div>
  );
};

export default PageAdmin;