<script>
import axios from "@/helper/axios.config.js";

export default {
  methods: {
    getProject(projects) {
      axios
        .get("/post")
        .then((res) => {
          projects = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
