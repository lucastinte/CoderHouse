import { model, Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";

const orderShema = new Schema({
  name: String,
  size: {
    type: String,
    enum: ["small", "medium", "large"],
    default: "medium",
  },
  price: Number,
  quantity: Number,
  date: {
    type: Date,
    default: Date.now,
  },
});
orderShema.plugin(paginate);
const orderModel = model("order", orderShema);
export default orderModel;
