import ImageContainer from "../../../../widgets/imageContainer";
import {useFetchProductsQuery} from "../../../../utils/redux/features/common/commonApiSlice.ts";

const TabsPanel = () => {
    const {data: products} = useFetchProductsQuery()
  return (
    <>
        {(products !== undefined) ? <div className="tabs-panel">
            <div id="large">
                <ImageContainer product_id={products[0].product_id} image={products[0].image_url} />
            </div>
            <div id="min-1">
                <ImageContainer product_id={products[1].product_id} image={products[1].image_url} />
            </div>
            <div id="min-2">
                <ImageContainer product_id={products[2].product_id} image={products[2].image_url} />
            </div>
            <div id="min-3">
                <ImageContainer product_id={products[3].product_id} image={products[3].image_url} />
            </div>
        </div> : null}
    </>
  );
};

export default TabsPanel;
