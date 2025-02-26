import { createSlice } from "@reduxjs/toolkit";

import {
  fetchGroupTrainingPlanFrontendAsync,
  fetchIndividualTrainingPlanFrontendAsync,
  fetchMockTestPlanFrontendAsync,
  fetchPracticeMockTestPlanFrontendAsync,
  fetchPracticeMockTestSectionalMockTestPlanFrontendAsync,
  fetchPracticePlanFrontendAsync,
  fetchSectionalMockTestPlanFrontendAsync,
  fetchShowFrontendCountAsync,
  fetchSubscriptionPlanAsync,
  fetchSubscriptionPlanFrontendAsync,
  fetchSubscriptionRegisterDetailAsync,
  fetchSubscriptionTypeAsync,
  fetchTrainingPlanAsync,
  registrationTotalAmountAsync,
  SubscriptionPlanListAsync,
  SubscriptionPlanRegisterAsync,
} from "../thunk/Subscription";

let initialState = {
  // frontend tabs and shop
  subscriptionFrontendStatus: "",
  subscriptionFrontendError: null,
  subscriptionFrontend: "",
  //frontend training
  //group
  groupTrainingFrontendStatus: "",
  groupTrainingFrontendError: null,
  groupTrainingFrontend: "",
  //individual
  individualTrainingFrontendStatus: "",
  individualTrainingFrontendError: null,
  individualTrainingFrontend: "",
  totalAud: 0,
  totalUsd: 0,
  totalMmk: 0,
  totalSgd: 0,
  totalNzd: 0,
  totalThb: 0,
  totalAmountStatus: "",
  totalAmountError: "",

  //admin training crud
  trainingStatus: "",
  trainingError: null,
  training: "",
  //not use for now
  practiceFrontendStatus: "",
  practiceFrontendError: null,
  practiceFrontend: "",
  practiceMtFrontendStatus: "",
  practiceMtFrontendError: null,
  practiceMtFrontend: "",
  mtFrontendStatus: "",
  mtFrontendError: null,
  mtFrontend: "",
  practiceMtSectionalMtFrontendStatus: "",
  practiceMtSectionalMtFrontendError: null,
  practiceMtSectionalMtFrontend: "",
  sectionalMtFrontendStatus: "",
  sectionalMtFrontendError: null,
  sectionalMtFrontend: "",
  //not use for now
  subscriptionFrontendRegisterStatus: "",
  subscriptionFrontendRegisterError: null,
  subscriptionFrontendRegister: "",
  subscriptionStatus: "",
  subscriptionError: "",
  subscriptionType: "",
  subscriptionTypestatus: "",
  subscription: "",
  subscriptionTypeError: "",
  subscriptionRegisterList: "",
  subscriptionRegisterStatus: "",
  subscriptionRegisterError: "",
  subscriptionRegisterDetail: "",
  showFrontendCount: "",
  showFrontendCountStatus: "",
  showFrontendCountError: null,
};
const SubscriptionSlice = createSlice({
  name: "SubscriptionSlice",
  initialState,
  reducers: {
    cleanRegisterStatus: (state) => {
      state.subscriptionFrontendRegisterError = null;
      state.subscriptionFrontendRegister = "";
      state.subscriptionFrontendRegisterStatus = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSubscriptionTypeAsync.pending, (state) => {
      state.subscriptionTypeStatus = "loading";
    });
    builder.addCase(fetchSubscriptionTypeAsync.fulfilled, (state, action) => {
      state.subscriptionTypeStatus = "succeeded";
      state.subscriptionType = action.payload;
    });

    builder.addCase(fetchSubscriptionTypeAsync.rejected, (state, action) => {
      state.subscriptionTypeStatus = "failed";
      state.subscriptionTypeError = action.error.message;
    });

    //subscription plan admin
    builder.addCase(fetchSubscriptionPlanAsync.pending, (state) => {
      state.subscriptionStatus = "loading";
      state.subscriptionError = null;
    });
    builder.addCase(fetchSubscriptionPlanAsync.fulfilled, (state, action) => {
      state.subscriptionStatus = "succeeded";
      state.subscription = action.payload;
      state.subscriptionError = null;
    });
    builder.addCase(fetchSubscriptionPlanAsync.rejected, (state, action) => {
      state.subscriptionStatus = "failed";
      state.subscriptionError = action.error.message;
    });
    //for training plan list
    builder.addCase(fetchTrainingPlanAsync.pending, (state) => {
      state.trainingStatus = "loading";
      state.trainingError = null;
    });
    builder.addCase(fetchTrainingPlanAsync.fulfilled, (state, action) => {
      state.trainingStatus = "succeeded";
      state.training = action.payload;
      state.trainingError = null;
    });

    builder.addCase(fetchTrainingPlanAsync.rejected, (state, action) => {
      state.trainingStatus = "failed";
      state.trainingError = action.error.message;
    });
    //for subscriptional tabs
    //practice frontend
    builder.addCase(fetchSubscriptionPlanFrontendAsync.pending, (state) => {
      state.subscriptionFrontendStatus = "loading";
      state.subscriptionFrontendError = null;
    });
    builder.addCase(
      fetchSubscriptionPlanFrontendAsync.fulfilled,
      (state, action) => {
        state.subscriptionFrontendStatus = "succeeded";
        state.subscriptionFrontend = action.payload;
        state.subscriptionFrontendError = null;
      }
    );
    builder.addCase(
      fetchSubscriptionPlanFrontendAsync.rejected,
      (state, action) => {
        state.subscriptionFrontendStatus = "failed";
        state.subscriptionFrontendError = action.error.message;
      }
    );
    //for front end training
    //group
    builder.addCase(fetchGroupTrainingPlanFrontendAsync.pending, (state) => {
      state.groupTrainingFrontendStatus = "loading";
      state.groupTrainingFrontendError = null;
    });
    builder.addCase(
      fetchGroupTrainingPlanFrontendAsync.fulfilled,
      (state, action) => {
        state.groupTrainingFrontendStatus = "succeeded";
        state.groupTrainingFrontend = action.payload;
        state.groupTrainingFrontendError = null;
      }
    );
    builder.addCase(
      fetchGroupTrainingPlanFrontendAsync.rejected,
      (state, action) => {
        state.groupTrainingFrontendStatus = "failed";
        state.groupTrainingFrontendError = action.error.message;
      }
    );
    //individual
    builder.addCase(
      fetchIndividualTrainingPlanFrontendAsync.pending,
      (state) => {
        state.individualTrainingFrontendStatus = "loading";
        state.individualTrainingFrontendError = null;
      }
    );
    builder.addCase(
      fetchIndividualTrainingPlanFrontendAsync.fulfilled,
      (state, action) => {
        state.individualTrainingFrontendStatus = "succeeded";
        state.individualTrainingFrontend = action.payload;
        state.individualTrainingFrontendError = null;
      }
    );
    builder.addCase(
      fetchIndividualTrainingPlanFrontendAsync.rejected,
      (state, action) => {
        state.individualTrainingFrontendStatus = "failed";
        state.individualTrainingFrontendError = action.error.message;
      }
    );

    //practice frontend
    builder.addCase(fetchPracticePlanFrontendAsync.pending, (state) => {
      state.practiceFrontendStatus = "loading";
      state.practiceFrontendError = null;
    });
    builder.addCase(
      fetchPracticePlanFrontendAsync.fulfilled,
      (state, action) => {
        state.practiceFrontendStatus = "succeeded";
        state.practiceFrontend = action.payload;
        state.practiceFrontendError = null;
      }
    );

    builder.addCase(
      fetchPracticePlanFrontendAsync.rejected,
      (state, action) => {
        state.practiceFrontendStatus = "failed";
        state.practiceFrontendError = action.error.message;
      }
    );
    //practice + mt frontend
    builder.addCase(fetchPracticeMockTestPlanFrontendAsync.pending, (state) => {
      state.practiceMtFrontendStatus = "loading";
      state.practiceMtFrontendError = null;
    });
    builder.addCase(
      fetchPracticeMockTestPlanFrontendAsync.fulfilled,
      (state, action) => {
        state.practiceMtFrontendStatus = "succeeded";
        state.practiceMtFrontend = action.payload;
        state.practiceMtFrontendError = null;
      }
    );

    builder.addCase(
      fetchPracticeMockTestPlanFrontendAsync.rejected,
      (state, action) => {
        state.practiceMtFrontendStatus = "failed";
        state.practiceMtFrontendError = action.error.message;
      }
    );
    //practice + mt +sectional frontend
    builder.addCase(
      fetchPracticeMockTestSectionalMockTestPlanFrontendAsync.pending,
      (state) => {
        state.practiceMtSectionalMtFrontendStatus = "loading";
        state.practiceMtSectionalMtFrontendError = null;
      }
    );
    builder.addCase(
      fetchPracticeMockTestSectionalMockTestPlanFrontendAsync.fulfilled,
      (state, action) => {
        state.practiceMtSectionalMtFrontendStatus = "succeeded";
        state.practiceMtSectionalMtFrontend = action.payload;
        state.practiceMtSectionalMtFrontendError = null;
      }
    );

    builder.addCase(
      fetchPracticeMockTestSectionalMockTestPlanFrontendAsync.rejected,
      (state, action) => {
        state.practiceMtSectionalMtFrontendStatus = "failed";
        state.practiceMtSectionalMtFrontendError = action.error.message;
      }
    );

    //mt frontend
    builder.addCase(fetchMockTestPlanFrontendAsync.pending, (state) => {
      state.mtFrontendStatus = "loading";
      state.mtFrontendError = null;
    });
    builder.addCase(
      fetchMockTestPlanFrontendAsync.fulfilled,
      (state, action) => {
        state.mtFrontendStatus = "succeeded";
        state.mtFrontend = action.payload;
        state.mtFrontendError = null;
      }
    );
    builder.addCase(
      fetchMockTestPlanFrontendAsync.rejected,
      (state, action) => {
        state.mtFrontendStatus = "failed";
        state.mtFrontendError = action.error.message;
      }
    );

    //sectional mt frontend
    builder.addCase(
      fetchSectionalMockTestPlanFrontendAsync.pending,
      (state) => {
        state.sectionalMtFrontendStatus = "loading";
        state.sectionalMtFrontendError = null;
      }
    );
    builder.addCase(
      fetchSectionalMockTestPlanFrontendAsync.fulfilled,
      (state, action) => {
        state.sectionalMtFrontendStatus = "succeeded";
        state.sectionalMtFrontend = action.payload;
        state.sectionalMtFrontendError = null;
      }
    );
    builder.addCase(
      fetchSectionalMockTestPlanFrontendAsync.rejected,
      (state, action) => {
        state.sectionalMtFrontendStatus = "failed";
        state.FrontendError = action.error.message;
      }
    );
    builder.addCase(SubscriptionPlanRegisterAsync.pending, (state) => {
      state.subscriptionFrontendRegisterStatus = "loading";
      state.subscriptionFrontendRegisterError = null;
    });
    builder.addCase(
      SubscriptionPlanRegisterAsync.fulfilled,
      (state, { payload }) => {
        console.log("payload >>", payload);
        state.subscriptionFrontendRegisterStatus = "succeeded";
        state.subscriptionFrontendRegister = payload;
      }
    );

    builder.addCase(
      SubscriptionPlanRegisterAsync.rejected,
      (state, { payload }) => {
        state.subscriptionFrontendRegisterStatus = "failed";
        state.subscriptionFrontendRegisterError = payload;
      }
    );
    builder.addCase(SubscriptionPlanListAsync.pending, (state) => {
      state.subscriptionRegisterStatus = "loading";
    });
    builder.addCase(SubscriptionPlanListAsync.fulfilled, (state, action) => {
      state.subscriptionRegisterStatus = "succeeded";
      state.subscriptionRegisterList = action.payload.data;
      state.totalAud = action.payload.amount.total_aud;
      state.totalMmk = action.payload.amount.total_mmk;
      state.totalUsd = action.payload.amount.total_usd;
      state.totalSgd = action.payload.amount.total_sgd;
      state.totalThb = action.payload.amount.total_thb;
      state.totalNzd = action.payload.amount.total_nzd;
    });

    builder.addCase(SubscriptionPlanListAsync.rejected, (state, action) => {
      state.subscriptionRegisterStatus = "failed";
      state.subscriptionRegisterError = action.error.message;
    });
    builder.addCase(fetchSubscriptionRegisterDetailAsync.pending, (state) => {
      state.subscriptionRegisterStatus = "loading";
    });
    builder.addCase(
      fetchSubscriptionRegisterDetailAsync.fulfilled,
      (state, action) => {
        state.subscriptionRegisterStatus = "succeeded";
        state.subscriptionRegisterDetail = action.payload;
      }
    );

    builder.addCase(
      fetchSubscriptionRegisterDetailAsync.rejected,
      (state, action) => {
        state.subscriptionRegisterStatus = "failed";
        state.subscriptionRegisterError = action.error.message;
      }
    );

    builder.addCase(fetchShowFrontendCountAsync.pending, (state) => {
      state.showFrontendCountStatus = "loading";
      state.showFrontendCountError = null;
    });
    builder.addCase(fetchShowFrontendCountAsync.fulfilled, (state, action) => {
      state.showFrontendCountStatus = "succeeded";
      state.showFrontendCount = action.payload;
      state.showFrontendCountError = null;
    });

    builder.addCase(fetchShowFrontendCountAsync.rejected, (state, action) => {
      state.showFrontendCountStatus = "failed";
      state.showFrontendCountError = action.payload;
    });
  },
});
export const { cleanRegisterStatus } = SubscriptionSlice.actions;
export default SubscriptionSlice.reducer;
