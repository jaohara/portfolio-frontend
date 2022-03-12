import { FC, useEffect, useRef, useState } from "react";
import { Link, Route, Switch, useParams } from "react-router-dom";

import JsxParser from "react-jsx-parser";

import { AdminFormRouteParams, ModelAdminProps } from "../PropInterfaces";
import { Image } from '../Types';

import { fetchData, highlightSearchTerms, notNullOrUndefined, unbindFormSubmissionHotkey } 
  from "../common/Helpers";

import AdminControls from "./common/AdminControls";
import AdminDataLength from "./common/AdminDataLength";
import AdminTableDeleteCell from "./common/AdminTableDeleteCell";
import AdminTablePreviewCell from "./common/AdminTablePreviewCell";
import AdminTableTooltipCell from "./common/AdminTableTooltipCell";
import AdminLoading from "./common/AdminLoading";

import ImageForm from "./ImageForm";

const ImageAdmin: FC<ModelAdminProps> = ({ borderChangeCallback }) => {
  // const [ error, setError ]         = useState(null);
  const [ , setError ]              = useState(null);
  const [ filter, setFilter ]       = useState("");
  const [ images, setImages ]       = useState([]);
  const [ isLoaded, setIsLoaded ]   = useState(false);

  let { editId } = useParams<AdminFormRouteParams>();

  useEffect(() => {
    unbindFormSubmissionHotkey();
    borderChangeCallback !== undefined && borderChangeCallback("image");
    fetchImages();
  }, []);

  const fetchImages = () => fetchData("/images/all", setIsLoaded, setImages, setError);

  const createEmptyImage = () => ({
    description: "",
    name: "",
  } as Image);

  const getImageIfExists = () => {
    let result = createEmptyImage();

    if (notNullOrUndefined(images)) {
      let filterResult = images.filter((image: Image) => image.id === editId);

      result = filterResult.length > 0 ? filterResult[0] : result;
    }

    return result;
  };

  return (
    <div className="admin-panel-images">
      {
        !isLoaded ? <AdminLoading destination="image"/> : (
          <Switch>
            <Route path="/admin/images/create">
              <ImageForm 
                backCallback={fetchImages}
                initialData={createEmptyImage() as Image}
              />
            </Route>

            <Route path="/admin/images/edit/:editId">
              <ImageForm
                backCallback={fetchImages}
                initialData={getImageIfExists() as Image}
              />
            </Route>

            <Route exact={true} path="/admin/images">
              <AdminControls 
                filterOnChange={setFilter}
                filterValue={filter}
                modelName="Image"
              />

              {
                images.length > 0 ? (
                <div className="admin-table-wrapper">
                  <AdminDataLength
                    dataLength={images.length}
                    modelName="Post"
                  />

                  {
                    /*
                      Right now this table structure is adapted from PostAdmin - I should rethink
                      how I want to display all of the images, as I don't think this is the best 
                      solution for this.
                    */
                  }
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>
                          ID
                        </th>
                        <th>
                          Name
                        </th>
                        <AdminTableTooltipCell 
                          cellContent="Preview"
                          tooltipText="Hover to display image preview."
                        />
                        <AdminTableTooltipCell 
                          cellContent="Delete?"
                          tooltipText="Permanently deletes the given Image."
                        />
                      </tr>
                    </thead>

                    <tbody>
                      {
                        images.map((image: any) => (
                          (filter.length === 0 ||
                            image.name.toLowerCase().match(filter.toLowerCase()) !== null) && (
                          <tr key={image.id}>
                            <td>
                              {image.id}
                            </td>
                            <td>
                              <Link
                                className="admin-table-edit-link"
                                to={`/admin/images/edit/${image.id}`}
                              >
                              {
                                filter.length === 0 ? image.name : 
                                (
                                  <JsxParser
                                    jsx={highlightSearchTerms(image.name, filter)}
                                  />
                                )
                              }
                              </Link>
                            </td>

                            <AdminTablePreviewCell
                              path="TEMP_FIX_ME"
                            />

                            <AdminTableDeleteCell
                              deletionKey="id"
                              deletionRoute="/images/delete"
                              deletionValue={image.id}
                              successCallback={fetchImages}
                            />
                          </tr>
                        )))
                      }
                    </tbody>
                  </table> 
                </div>) : (
                <p className="no-model-data-message">
                  There are no Images saved.
                </p>)
              }
            </Route>
          </Switch>
        )
      }
    </div>
  );
};

export default ImageAdmin;