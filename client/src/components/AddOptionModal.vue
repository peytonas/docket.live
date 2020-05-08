<template>
  <div class="add-option">
    <div class="modal" id="AddOptionModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modalSize" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Add an option
              <i
                class="reminderFont"
              >(Minimum of 2, maximum of 4 options to choose from)</i>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <input class="inputSize" type="text" placeholder="option" v-model="option.body" />
            <input
              class="inputSize"
              type="number"
              placeholder="Enter a point value for the option"
              v-model="option.points"
              min="0"
            />
            <br />
            <div class="d-flex colorRow">
              <input
                class="colorButton"
                title="Change the review color"
                value="#007bff"
                type="color"
                v-model="option.color"
              />
              <p class="pickerFont">Pick a Color</p>
            </div>
            <p class="reminderFont">The color is used represent this option in the review page.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button
              type="button"
              class="btn btn-primary"
              data-dismiss="modal"
              @click="addOption()"
            >Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import store from "../store";
export default {
  name: "add-option",
  data() {
    return {
      option: {
        body: "",
        points: 0,
        color: ""
      }
    };
  },
  mounted() {},
  computed: {},
  methods: {
    addOption() {
      let newOption = {
        body: this.option.body,
        points: this.option.points,
        color: this.option.color
      };
      this.$store.dispatch("addOption", newOption);
    }
  },
  components: {}
};
</script>


<style scoped>
.inputSize {
  width: 90%;
}

.reminderFont {
  font-size: x-small;
}

.colorRow {
  padding-top: 4px;
  display: flex;
  width: 90%;
  justify-content: center;
}

.pickerFont {
  margin: auto;
}

.colorButton {
  margin: auto;
  height: 40px;
}
</style>