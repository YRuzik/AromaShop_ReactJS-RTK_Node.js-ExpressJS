const OrderBlock = () => {
  return (
    <div
      className="order-block-bg"
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        position: "relative",
      }}
    >
      <div className="body-container">
        <div className="flexbox-line" style={{justifyContent: "end"}}>
          <div className="w-50">
            <h2 className="pb-1">
              Помимо готовой продукции высокого качества, мы можем для Вас
              произвести свечки под заказ.
            </h2>
            Благодаря личному производству мы изготавливаем большие партии в
            короткие сроки, а так же у Вас всегда есть возможность
            кастомизировать изделия.
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderBlock;
